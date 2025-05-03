import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Search, Clock, CheckCircle, XCircle, BarChart2, Eye } from "lucide-react"
import Button from "../../components/common/Button"
import ProjectCard from "../../components/common/ProjectCard"

// Mock data
import { projects } from "../../data/mockData"

const ContributorDashboardPage = () => {
  const [appliedProjects, setAppliedProjects] = useState([])
  const [recommendedProjects, setRecommendedProjects] = useState([])
  const [stats, setStats] = useState({
    totalApplications: 0,
    acceptedApplications: 0,
    rejectedApplications: 0,
    pendingApplications: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setAppliedProjects([
        {
          id: "app1",
          projectId: projects[0].id,
          project: projects[0],
          status: "pending",
          appliedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "app2",
          projectId: projects[1].id,
          project: projects[1],
          status: "accepted",
          appliedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "app3",
          projectId: projects[2].id,
          project: projects[2],
          status: "rejected",
          appliedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ])

      setRecommendedProjects(projects.slice(3, 6))

      setStats({
        totalApplications: 8,
        acceptedApplications: 3,
        rejectedApplications: 2,
        pendingApplications: 3,
      })

      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Contributor Dashboard</h1>
        <Link to="/home">
          <Button variant="primary">
            <Search size={18} className="mr-2" />
            Find Projects
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Applications" value={stats.totalApplications} icon={<BarChart2 />} color="blue" delay={0.1} />
        <StatCard label="Pending" value={stats.pendingApplications} icon={<Clock />} color="yellow" delay={0.2} />
        <StatCard label="Accepted" value={stats.acceptedApplications} icon={<CheckCircle />} color="green" delay={0.3} />
        <StatCard label="Rejected" value={stats.rejectedApplications} icon={<XCircle />} color="red" delay={0.4} />
      </div>

      {/* Applications Table */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Applications</h2>
          <Link to="/dashboard/applications" className="text-primary text-sm font-medium hover:underline">
            View All
          </Link>
        </div>

        {appliedProjects.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
            <p className="text-gray-600 mb-4">Start applying to projects that match your skills and interests.</p>
            <Link to="/home">
              <Button variant="primary">
                <Search size={18} className="mr-2" />
                Browse Projects
              </Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <TableHeader title="Project" />
                    <TableHeader title="Applied" />
                    <TableHeader title="Status" />
                    <TableHeader title="Actions" />
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appliedProjects.map((app) => (
                    <tr key={app.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{app.project.title}</div>
                        <div className="text-sm text-gray-500">{app.project.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(app.appliedAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                          app.status === "accepted"
                            ? "bg-green-100 text-green-800"
                            : app.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link to={`/projects/${app.projectId}`}>
                          <Button variant="ghost" size="sm">
                            <Eye size={16} className="mr-1" />
                            View Project
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Recommended Projects */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recommended for You</h2>
          <Link to="/home" className="text-primary text-sm font-medium hover:underline">
            View More
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ label, value, icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay }}
    className="bg-white rounded-xl shadow-sm p-5"
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
      <div className={`bg-${color}-100 p-2 rounded-lg`}>
        {icon && <div className={`text-${color}-600`}>{icon}</div>}
      </div>
    </div>
  </motion.div>
)

const TableHeader = ({ title }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</th>
)

export default ContributorDashboardPage
