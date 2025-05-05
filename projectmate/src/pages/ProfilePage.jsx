import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { User, Mail, MapPin, Globe, Briefcase, Calendar, Github, Linkedin, ExternalLink, Edit, MessageSquare, Code, Palette, Database, Server, Cpu } from 'lucide-react'
import Button from "../components/common/Button"
import ProjectCard from "../components/common/ProjectCard"
import Badge from "../components/common/Badge"
import { useAuth } from "../contexts/AuthContext"

// Mock data - replace with API calls
import { projects } from "../data/mockData"

const ProfilePage = () => {
  const { id } = useParams()
  const { user: currentUser } = useAuth()
  const [user, setUser] = useState(null)
  const [userProjects, setUserProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("projects")

  useEffect(() => {
    // Simulate API call to fetch user profile
    setTimeout(() => {
      // Mock user data
      const mockUser = {
        id,
        name: "Alex Johnson",
        title: "Full Stack Developer",
        avatar: "/placeholder-avatar.png",
        bio: "Passionate developer with 5+ years of experience building web applications. I love collaborating on innovative projects that solve real-world problems.",
        location: "San Francisco, CA",
        email: "alex@example.com",
        website: "https://alexjohnson.dev",
        github: "alexjohnson",
        linkedin: "alexjohnson",
        joinedDate: "January 2022",
        skills: [
          { name: "React", level: "Expert", category: "Frontend" },
          { name: "Node.js", level: "Advanced", category: "Backend" },
          { name: "MongoDB", level: "Intermediate", category: "Database" },
          { name: "TypeScript", level: "Advanced", category: "Language" },
          { name: "GraphQL", level: "Intermediate", category: "API" },
          { name: "AWS", level: "Intermediate", category: "DevOps" },
          { name: "Docker", level: "Beginner", category: "DevOps" },
          { name: "UI/UX Design", level: "Intermediate", category: "Design" },
        ],
        experience: [
          {
            title: "Senior Developer",
            company: "Tech Innovations Inc.",
            period: "2020 - Present",
            description: "Leading development of web applications using React and Node.js.",
          },
          {
            title: "Web Developer",
            company: "Digital Solutions",
            period: "2018 - 2020",
            description: "Developed responsive websites and e-commerce platforms.",
          },
        ],
        education: [
          {
            degree: "M.S. Computer Science",
            institution: "Stanford University",
            year: "2018",
          },
          {
            degree: "B.S. Computer Science",
            institution: "UC Berkeley",
            year: "2016",
          },
        ],
        completedProjects: 12,
        ongoingProjects: 3,
      }

      setUser(mockUser)

      // Filter projects created by this user
      const filteredProjects = projects.filter((project) => project.createdBy.id === id)
      setUserProjects(filteredProjects)

      setLoading(false)
    }, 1000)
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="bg-gray-200 h-64 rounded-xl mb-6"></div>
              <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-1/2 mb-6"></div>
              <div className="bg-gray-200 h-32 rounded-xl"></div>
            </div>
            <div className="md:w-2/3">
              <div className="bg-gray-200 h-8 rounded w-1/4 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-200 h-64 rounded-xl"></div>
                <div className="bg-gray-200 h-64 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center max-w-md">
          <h3 className="text-lg font-medium text-gray-900 mb-2">User not found</h3>
          <p className="text-gray-600 mb-4">The user you're looking for might not exist or has been removed.</p>
          <Link to="/home">
            <Button variant="primary">Browse Projects</Button>
          </Link>
        </div>
      </div>
    )
  }

  const isCurrentUser = currentUser && currentUser.id === user.id

  // Function to render skill icon based on category
  const getSkillIcon = (category) => {
    switch (category) {
      case "Frontend":
        return <Code size={16} className="text-blue-500" />
      case "Backend":
        return <Server size={16} className="text-green-500" />
      case "Database":
        return <Database size={16} className="text-purple-500" />
      case "Design":
        return <Palette size={16} className="text-pink-500" />
      default:
        return <Cpu size={16} className="text-gray-500" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Profile Info */}
        <div className="lg:w-1/3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden mb-6"
          >
            <div className="bg-gradient-to-r from-primary to-primary-dark h-32 relative"></div>
            <div className="px-6 pb-6 relative">
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  className="w-32 h-32 rounded-full border-4 border-white object-cover"
                />
              </div>
              <div className="mt-20 text-center">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600">{user.title}</p>

                <div className="flex justify-center mt-4 space-x-2">
                  {isCurrentUser ? (
                    <Button as="link" to="/dashboard/settings" variant="primary" size="sm">
                      <Edit size={16} className="mr-1" />
                      Edit Profile
                    </Button>
                  ) : (
                    <Button variant="primary" size="sm">
                      <MessageSquare size={16} className="mr-1" />
                      Message
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 mb-6"
          >
            <h2 className="text-lg font-semibold mb-4">About</h2>
            <p className="text-gray-600 mb-4">{user.bio}</p>

            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <MapPin size={18} className="mr-2 text-gray-400" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail size={18} className="mr-2 text-gray-400" />
                <span>{user.email}</span>
              </div>
              {user.website && (
                <div className="flex items-center text-gray-600">
                  <Globe size={18} className="mr-2 text-gray-400" />
                  <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {user.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              {user.github && (
                <div className="flex items-center text-gray-600">
                  <Github size={18} className="mr-2 text-gray-400" />
                  <a 
                    href={`https://github.com/${user.github}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {user.github}
                  </a>
                </div>
              )}
              {user.linkedin && (
                <div className="flex items-center text-gray-600">
                  <Linkedin size={18} className="mr-2 text-gray-400" />
                  <a 
                    href={`https://linkedin.com/in/${user.linkedin}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {user.linkedin}
                  </a>
                </div>
              )}
              <div className="flex items-center text-gray-600">
                <Calendar size={18} className="mr-2 text-gray-400" />
                <span>Joined {user.joinedDate}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6 mb-6"
          >
            <h2 className="text-lg font-semibold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill) => (
                <div 
                  key={skill.name} 
                  className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 text-sm"
                  title={`${skill.level} in ${skill.name}`}
                >
                  {getSkillIcon(skill.category)}
                  <span className="ml-1.5">{skill.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Stats</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary">{user.completedProjects}</p>
                <p className="text-sm text-gray-600">Completed Projects</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary">{user.ongoingProjects}</p>
                <p className="text-sm text-gray-600">Ongoing Projects</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Projects and Experience */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === "projects"
                      ? "border-b-2 border-primary text-primary"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("projects")}
                >
                  Projects
                </button>
                <button
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === "experience"
                      ? "border-b-2 border-primary text-primary"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("experience")}
                >
                  Experience
                </button>
                <button
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === "education"
                      ? "border-b-2 border-primary text-primary"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("education")}
                >
                  Education
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === "projects" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Projects</h2>
                    {isCurrentUser && (
                      <Link to="/dashboard/create-project">
                        <Button variant="primary" size="sm">
                          Create Project
                        </Button>
                      </Link>
                    )}
                  </div>

                  {userProjects.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">No projects yet</p>
                      {isCurrentUser && (
                        <Link to="/dashboard/create-project">
                          <Button variant="primary">Create Your First Project</Button>
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {userProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "experience" && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">Work Experience</h2>
                  <div className="space-y-6">
                    {user.experience.map((exp, index) => (
                      <div key={index} className="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-0 last:pb-0">
                        <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"></div>
                        <h3 className="text-lg font-medium text-gray-900">{exp.title}</h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <Briefcase size={16} className="mr-2" />
                          <span>{exp.company}</span>
                          <span className="mx-2">•</span>
                          <span>{exp.period}</span>
                        </div>
                        <p className="text-gray-600">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "education" && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">Education</h2>
                  <div className="space-y-6">
                    {user.education.map((edu, index) => (
                      <div key={index} className="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-0 last:pb-0">
                        <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"></div>
                        <h3 className="text-lg font-medium text-gray-900">{edu.degree}</h3>
                        <div className="flex items-center text-gray-600">
                          <Globe size={16} className="mr-2" />
                          <span>{edu.institution}</span>
                          <span className="mx-2">•</span>
                          <span>{edu.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
