import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Calendar, DollarSign, Users, Clock, MapPin, Globe, Share2, Bookmark, MessageSquare } from "lucide-react"
import Button from "../components/common/Button"
import Badge from "../components/common/Badge"
import { useAuth } from "../contexts/AuthContext"

// Mock data - replace with API calls
import { projects } from "../data/mockData"

const ProjectDetailPage = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      try {
        const foundProject = projects.find((p) => p.id === id)
        if (foundProject) {
          setProject(foundProject)
        } else {
          setError("Project not found")
        }
        setLoading(false)
      } catch (err) {
        setError("Failed to load project details")
        setLoading(false)
      }
    }, 500)
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-pulse flex flex-col w-full max-w-4xl">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center max-w-md">
          <h3 className="text-lg font-medium text-gray-900 mb-2">{error}</h3>
          <p className="text-gray-600 mb-4">The project you're looking for might have been removed or doesn't exist.</p>
          <Link to="/home">
            <Button variant="primary">Browse Projects</Button>
          </Link>
        </div>
      </div>
    )
  }

  const {
    title,
    description,
    category,
    isPaid,
    budget,
    deadline,
    requiredSkills,
    createdBy,
    teamSize,
    location,
    duration,
    createdAt,
    detailedDescription,
    responsibilities,
    requirements,
  } = project

  const isCreator = user && user.id === createdBy.id
  const hasApplied = false // Replace with actual check from API

  const toggleSave = () => {
    setIsSaved(!isSaved)
    // API call to save/unsave project
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={isPaid ? "success" : "info"}>{isPaid ? "Paid" : "Free"}</Badge>
              <Badge variant="secondary">{category}</Badge>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="flex items-center text-sm text-gray-600">
              <Clock size={16} className="mr-1" />
              <span>Posted {new Date(createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={toggleSave} className={isSaved ? "text-primary" : ""}>
              <Bookmark size={18} className="mr-1" />
              {isSaved ? "Saved" : "Save"}
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 size={18} className="mr-1" />
              Share
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col">
            <div className="flex items-center text-gray-700 mb-3">
              <DollarSign size={20} className="text-primary mr-2" />
              <div>
                <h3 className="font-medium">Budget</h3>
                <p>{isPaid ? `$${budget}` : "Volunteer"}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-700 mb-3">
              <Calendar size={20} className="text-primary mr-2" />
              <div>
                <h3 className="font-medium">Deadline</h3>
                <p>{new Date(deadline).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-700 mb-3">
              <Clock size={20} className="text-primary mr-2" />
              <div>
                <h3 className="font-medium">Duration</h3>
                <p>{duration}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-700">
              <Users size={20} className="text-primary mr-2" />
              <div>
                <h3 className="font-medium">Team Size</h3>
                <p>{teamSize} people</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col">
            <div className="flex items-center text-gray-700 mb-3">
              <MapPin size={20} className="text-primary mr-2" />
              <div>
                <h3 className="font-medium">Location</h3>
                <p>{location}</p>
              </div>
            </div>
            <div className="flex items-start text-gray-700">
              <Globe size={20} className="text-primary mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium">Required Skills</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {requiredSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block bg-gray-100 rounded-full px-2 py-0.5 text-xs text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col">
            <h3 className="font-medium mb-3">Project Creator</h3>
            <div className="flex items-center mb-4">
              <img
                src={createdBy.avatar || "/placeholder-avatar.png"}
                alt={createdBy.name}
                className="w-12 h-12 rounded-full mr-3 object-cover"
              />
              <div>
                <h4 className="font-medium">{createdBy.name}</h4>
                <p className="text-sm text-gray-600">{createdBy.title}</p>
              </div>
            </div>
            <Link to={`/profile/${createdBy.id}`}>
              <Button variant="outline" size="sm" fullWidth>
                View Profile
              </Button>
            </Link>
            {!isCreator && (
              <Button
                variant="primary"
                className="mt-2"
                fullWidth
                as="link"
                to={hasApplied ? "#" : `/dashboard/apply/${id}`}
                disabled={hasApplied}
              >
                {hasApplied ? "Applied" : "Apply Now"}
              </Button>
            )}
            {!isCreator && (
              <Button
                variant="ghost"
                className="mt-2"
                fullWidth
                as="link"
                to={`/dashboard/messages?user=${createdBy.id}`}
              >
                <MessageSquare size={16} className="mr-1" />
                Contact
              </Button>
            )}
            {isCreator && (
              <Button variant="primary" className="mt-2" fullWidth as="link" to={`/dashboard/edit-project/${id}`}>
                Edit Project
              </Button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Project Details</h2>
          <div className="prose max-w-none">
            <p>{detailedDescription}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Responsibilities</h2>
          <ul className="list-disc pl-5 space-y-2">
            {responsibilities.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Requirements</h2>
          <ul className="list-disc pl-5 space-y-2">
            {requirements.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  )
}

export default ProjectDetailPage
