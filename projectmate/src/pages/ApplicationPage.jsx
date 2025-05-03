import React, { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { ArrowLeft } from "lucide-react"
import Button from "../components/common/Button"
import Input from "../components/common/Input"
import Badge from "../components/common/Badge"

// Mock data - replace with API calls
import { projects } from "../data/mockData"

const schema = yup.object({
  coverLetter: yup.string().required("Cover letter is required"),
  expectedCompensation: yup.string().when("isPaid", {
    is: true,
    then: yup.string().required("Expected compensation is required"),
  }),
  availability: yup.string().required("Availability is required"),
  portfolioUrl: yup.string().url("Please enter a valid URL"),
}).required()

const ApplicationPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundProject = projects.find((p) => p.id === id)
      if (foundProject) {
        setProject(foundProject)
      } else {
        setError("Project not found")
      }
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [id])

  const onSubmit = async (data) => {
    try {
      setSubmitting(true)

      const applicationData = {
        projectId: project.id,
        ...data,
        appliedAt: new Date().toISOString(),
      }

      console.log("Application data to submit:", applicationData)

      setTimeout(() => {
        setSubmitting(false)
        navigate("/dashboard/contributor", {
          state: { applicationSubmitted: true },
        })
      }, 1000)
    } catch (err) {
      console.error("Error submitting application:", err)
      setSubmitting(false)
      setError("Failed to submit application. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-12 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">{error || "Project not found"}</h3>
          <p className="text-gray-600 mb-4">
            The project you're trying to apply for might have been removed or doesn't exist.
          </p>
          <Link to="/home">
            <Button variant="primary">Browse Projects</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Link to={`/projects/${id}`} className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft size={16} className="mr-1" />
          Back to Project
        </Link>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={project.isPaid ? "success" : "info"}>
              {project.isPaid ? "Paid" : "Free"}
            </Badge>
            <Badge variant="secondary">{project.category}</Badge>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Apply for: {project.title}</h1>
          <p className="text-gray-600 mb-4">{project.description}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Application Details</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label>
                <textarea
                  className={`input min-h-[150px] ${errors.coverLetter ? "border-red-500 focus:ring-red-500" : ""}`}
                  placeholder="Introduce yourself and explain why you're a good fit for this project..."
                  {...register("coverLetter")}
                ></textarea>
                {errors.coverLetter && (
                  <p className="mt-1 text-sm text-red-600">{errors.coverLetter.message}</p>
                )}
              </div>

              {project.isPaid && (
                <Input
                  label="Expected Compensation"
                  id="expectedCompensation"
                  placeholder={`The project budget is $${project.budget}`}
                  error={errors.expectedCompensation?.message}
                  {...register("expectedCompensation")}
                />
              )}

              <Input
                label="Availability"
                id="availability"
                placeholder="When can you start and how many hours per week can you commit?"
                error={errors.availability?.message}
                {...register("availability")}
              />

              <Input
                label="Portfolio URL (Optional)"
                id="portfolioUrl"
                placeholder="https://your-portfolio.com"
                error={errors.portfolioUrl?.message}
                {...register("portfolioUrl")}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relevant Skills</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.requiredSkills.map((skill) => (
                    <div key={skill} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`skill-${skill}`}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor={`skill-${skill}`} className="ml-2 text-sm text-gray-700">
                        {skill}
                      </label>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500">Select the skills you have that are relevant to this project.</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => navigate(`/projects/${id}`)} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default ApplicationPage
