import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  PlusCircle,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  BarChart2,
  Eye,
} from "lucide-react"

import Button from "../../components/common/Button"
import ProjectCard from "../../components/common/ProjectCard"

// Mock data (replace with real API calls if needed)
import { projects } from "../../data/mockData"

const CreatorDashboardPage = () => {
  const [userProjects, setUserProjects] = useState([])
  const [applications, setApplications] = useState([])
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    totalApplications: 0,
    acceptedApplications: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      const filteredProjects = projects.slice(0, 3)
      setUserProjects(filteredProjects)

      setApplications([
        {
          id: "1",
          projectId: filteredProjects[0].id,
          projectTitle: filteredProjects[0].title,
          applicant: {
            id: "user1",
            name: "John Doe",
            avatar: "/placeholder-avatar.png",
            title: "Frontend Developer",
          },
          status: "pending",
          appliedAt: new Date().toISOString(),
        },
        {
          id: "2",
          projectId: filteredProjects[0].id,
          projectTitle: filteredProjects[0].title,
          applicant: {
            id: "user2",
            name: "Jane Smith",
            avatar: "/placeholder-avatar.png",
            title: "UI/UX Designer",
          },
          status: "accepted",
          appliedAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: "3",
          projectId: filteredProjects[1].id,
          projectTitle: filteredProjects[1].title,
          applicant: {
            id: "user3",
            name: "Mike Johnson",
            avatar: "/placeholder-avatar.png",
            title: "Backend Developer",
          },
          status: "rejected",
          appliedAt: new Date(Date.now() - 172800000).toISOString(),
        },
      ])

      setStats({
        totalProjects: filteredProjects.length,
        activeProjects: filteredProjects.filter(
          (p) => new Date(p.deadline) > new Date()
        ).length,
        totalApplications: 10,
        acceptedApplications: 3,
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
        <h1 className="text-3xl font-bold">Creator Dashboard</h1>
        <Link to="/dashboard/create-project">
          <Button variant="primary">
            <PlusCircle size={18} className="mr-2" />
            Create New Project
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Projects" value={stats.totalProjects} icon={<BarChart2 />} color="blue" delay={0.1} />
        <StatCard label="Active Projects" value={stats.activeProjects} icon={<Clock />} color="green" delay={0.2} />
        <StatCard label="Total Applications" value={stats.totalApplications} icon={<Users />} color="purple" delay={0.3} />
        <StatCard label="Accepted Applications" value={stats.acceptedApplications} icon={<CheckCircle />} color="primary" delay={0.4} />
      </div>

      {/* Your Projects */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Projects</h2>
          <Link to="/dashboard/projects" className="text-primary text-sm hover:underline">
            View All
          </Link>
        </div>

        {userProjects.length === 0 ? (
          <div className="bg-white p-8 text-center shadow-sm rounded-xl">
            <h3 className="text-lg font-medium mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-4">Create your first project to find collaborators.</p>
            <Link to="/dashboard/create-project">
              <Button variant="primary">
                <PlusCircle size={18} className="mr-2" />
                Create Project
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>

      {/* Applications */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recent Applications</h2>
          <Link to="/dashboard/applications" className="text-primary text-sm hover:underline">
            View All
          </Link>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white p-8 text-center shadow-sm rounded-xl">
            <h3 className="text-lg font-medium mb-2">No applications yet</h3>
            <p className="text-gray-600">Applications to your projects will appear here.</p>
          </div>
        ) : (
          <div className="bg-white shadow-sm rounded-xl overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <TableHeader title="Applicant" />
                  <TableHeader title="Project" />
                  <TableHeader title="Applied" />
                  <TableHeader title="Status" />
                  <TableHeader title="Actions" />
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img className="h-10 w-10 rounded-full object-cover" src={app.applicant.avatar} alt={app.applicant.name} />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{app.applicant.name}</div>
                          <div className="text-sm text-gray-500">{app.applicant.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{app.projectTitle}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                        app.status === "accepted" ? "bg-green-100 text-green-800"
                        : app.status === "rejected" ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <Link to={`/dashboard/applications/${app.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye size={16} className="mr-1" /> View
                          </Button>
                        </Link>
                        {app.status === "pending" && (
                          <>
                            <Button variant="ghost" size="sm" className="text-green-600">
                              <CheckCircle size={16} className="mr-1" /> Accept
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <XCircle size={16} className="mr-1" /> Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

// Reusable Subcomponents
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
      <div className={`p-2 rounded-lg bg-${color}-100`}>
        {icon}
      </div>
    </div>
  </motion.div>
)

const TableHeader = ({ title }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</th>
)

export default CreatorDashboardPage
