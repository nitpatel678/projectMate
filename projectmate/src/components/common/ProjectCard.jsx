import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Calendar, Users, DollarSign } from "lucide-react"
import Badge from "./Badge"

const ProjectCard = ({ project }) => {
  const {
    id,
    title,
    description,
    category,
    isPaid,
    budget,
    deadline,
    requiredSkills,
    createdBy,
    teamSize,
  } = project

  return (
    <motion.div whileHover={{ y: -5 }} className="card h-full flex flex-col">
      <Link to={`/projects/${id}`} className="flex flex-col h-full">
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-3 font-poppins">
            <Badge variant={isPaid ? "success" : "info"}>
              {isPaid ? "Paid" : "Free"}
            </Badge>
            <Badge variant="secondary">{category}</Badge>
          </div>

          <h3 className="text-lg font-semibold mb-2 text-gray-900 font-geologica">{title}</h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2 font-calibri">
            {description}
          </p>

          <div className="mt-auto space-y-2">
            {isPaid && (
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign size={16} className="mr-2 text-primary" />
                <span>${budget}</span>
              </div>
            )}

            <div className="flex items-center text-sm text-gray-600">
              <Calendar size={16} className="mr-2 text-primary" />
              <span className="font-poppins">Deadline: {new Date(deadline).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <Users size={16} className="mr-2 text-primary" />
              <span className="font-poppins">Team Size: {teamSize}</span>
            </div>
          </div>
        </div>

        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src={createdBy.avatar || "/placeholder-avatar.png"}
              alt={createdBy.name}
              className="w-8 h-8 rounded-full mr-2 object-cover"
            />
            <span className="text-sm font-medium font-poppins">{createdBy.name}</span>
          </div>

          <div className="flex space-x-1">
            {requiredSkills.slice(0, 2).map((skill, index) => (
              <span
                key={index}
                className="inline-block font-poppins bg-gray-200 rounded-full px-2 py-0.5 text-xs text-gray-700"
              >
                {skill}
              </span>
            ))}
            {requiredSkills.length > 2 && (
              <span className="inline-block bg-gray-200 rounded-full px-2 py-0.5 text-xs text-gray-700">
                +{requiredSkills.length - 2}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProjectCard
