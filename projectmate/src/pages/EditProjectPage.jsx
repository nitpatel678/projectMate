"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { X, Plus, ArrowLeft } from "lucide-react"
import Button from "../components/common/Button"
import Input from "../components/common/Input"

// Mock data - replace with API calls
import { projects } from "../data/mockData"

const schema = yup
  .object({
    title: yup.string().required("Project title is required"),
    description: yup.string().required("Short description is required"),
    category: yup.string().required("Category is required"),
    isPaid: yup.boolean().required(),
    budget: yup.number().when("isPaid", {
      is: true,
      then: yup.number().required("Budget is required").positive("Budget must be positive"),
    }),
    deadline: yup.date().required("Deadline is required").min(new Date(), "Deadline must be in the future"),
    teamSize: yup
      .number()
      .required("Team size is required")
      .positive("Team size must be positive")
      .integer("Team size must be a whole number"),
    location: yup.string().required("Location is required"),
    duration: yup.string().required("Duration is required"),
    detailedDescription: yup.string().required("Detailed description is required"),
  })
  .required()

const EditProjectPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [skills, setSkills] = useState([])
  const [newSkill, setNewSkill] = useState("")
  const [responsibilities, setResponsibilities] = useState([""])
  const [requirements, setRequirements] = useState([""])

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      isPaid: false,
      teamSize: 1,
    },
  })

  const isPaid = watch("isPaid")

  useEffect(() => {
    // Fetch project data
    const fetchProject = async () => {
      try {
        // This would be an API call in a real app
        // Simulate API call with mock data
        setTimeout(() => {
          const project = projects.find((p) => p.id === id)

          if (!project) {
            setError("Project not found")
            setLoading(false)
            return
          }

          // Set form values
          setValue("title", project.title)
          setValue("description", project.description)
          setValue("category", project.category)
          setValue("isPaid", project.isPaid)
          if (project.isPaid) {
            setValue("budget", project.budget)
          }
          setValue("deadline", new Date(project.deadline).toISOString().split("T")[0])
          setValue("teamSize", project.teamSize)
          setValue("location", project.location)
          setValue("duration", project.duration)
          setValue("detailedDescription", project.detailedDescription)

          // Set other state
          setSkills(project.requiredSkills || [])
          setResponsibilities(project.responsibilities || [""])
          setRequirements(project.requirements || [""])

          setLoading(false)
        }, 1000)
      } catch (err) {
        console.error("Error fetching project:", err)
        setError("Failed to load project data")
        setLoading(false)
      }
    }

    fetchProject()
  }, [id, setValue])

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const addResponsibility = () => {
    setResponsibilities([...responsibilities, ""])
  }

  const updateResponsibility = (index, value) => {
    const updated = [...responsibilities]
    updated[index] = value
    setResponsibilities(updated)
  }

  const removeResponsibility = (index) => {
    if (responsibilities.length > 1) {
      const updated = [...responsibilities]
      updated.splice(index, 1)
      setResponsibilities(updated)
    }
  }

  const addRequirement = () => {
    setRequirements([...requirements, ""])
  }

  const updateRequirement = (index, value) => {
    const updated = [...requirements]
    updated[index] = value
    setRequirements(updated)
  }

  const removeRequirement = (index) => {
    if (requirements.length > 1) {
      const updated = [...requirements]
      updated.splice(index, 1)
      setRequirements(updated)
    }
  }

  const onSubmit = async (data) => {
    if (skills.length === 0) {
      alert("Please add at least one required skill")
      return
    }

    if (responsibilities.some((r) => !r.trim())) {
      alert("Please fill all responsibilities or remove empty ones")
      return
    }

    if (requirements.some((r) => !r.trim())) {
      alert("Please fill all requirements or remove empty ones")
      return
    }

    try {
      setIsSubmitting(true)

      // Combine form data with skills, responsibilities, and requirements
      const projectData = {
        ...data,
        id,
        requiredSkills: skills,
        responsibilities: responsibilities.filter((r) => r.trim()),
        requirements: requirements.filter((r) => r.trim()),
        updatedAt: new Date().toISOString(),
      }

      console.log("Project data to update:", projectData)

      // API call to update project would go here

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false)
        navigate(`/projects/${id}`)
      }, 1000)
    } catch (error) {
      console.error("Error updating project:", error)
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-12 bg-gray-200 rounded w-1/4 ml-auto"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">{error}</h3>
          <p className="text-gray-600 mb-4">
            The project you're trying to edit might have been removed or doesn't exist.
          </p>
          <Button as="link" to="/dashboard/creator" variant="primary">
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center mb-6">
          <Button as="link" to={`/projects/${id}`} variant="ghost" size="sm" className="mr-4">
            <ArrowLeft size={16} className="mr-1" />
            Back to Project
          </Button>
          <h1 className="text-3xl font-bold">Edit Project</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Project Title" id="title" error={errors.title?.message} {...register("title")} />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  className={`input ${errors.category ? "border-red-500 focus:ring-red-500" : ""}`}
                  {...register("category")}
                >
                  <option value="">Select Category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Database">Database</option>
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
              </div>

              <div className="md:col-span-2">
                <Input
                  label="Short Description"
                  id="description"
                  error={errors.description?.message}
                  {...register("description")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="false"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      {...register("isPaid")}
                      checked={!isPaid}
                      onChange={() => {}}
                    />
                    <span className="ml-2 text-sm text-gray-700">Free / Volunteer</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="true"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      {...register("isPaid")}
                      checked={isPaid}
                      onChange={() => {}}
                    />
                    <span className="ml-2 text-sm text-gray-700">Paid</span>
                  </label>
                </div>
              </div>

              {isPaid && (
                <Input
                  label="Budget ($)"
                  id="budget"
                  type="number"
                  error={errors.budget?.message}
                  {...register("budget")}
                />
              )}

              <Input
                label="Team Size"
                id="teamSize"
                type="number"
                error={errors.teamSize?.message}
                {...register("teamSize")}
              />

              <Input label="Location" id="location" error={errors.location?.message} {...register("location")} />

              <Input
                label="Duration"
                id="duration"
                placeholder="e.g., 2 weeks, 3 months"
                error={errors.duration?.message}
                {...register("duration")}
              />

              <Input
                label="Deadline"
                id="deadline"
                type="date"
                error={errors.deadline?.message}
                {...register("deadline")}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Required Skills</h2>

            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill) => (
                <div key={skill} className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
                className="input mr-2"
              />
              <Button type="button" variant="outline" onClick={addSkill}>
                Add
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Project Details</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
              <textarea
                className={`input min-h-[150px] ${errors.detailedDescription ? "border-red-500 focus:ring-red-500" : ""}`}
                {...register("detailedDescription")}
              ></textarea>
              {errors.detailedDescription && (
                <p className="mt-1 text-sm text-red-600">{errors.detailedDescription.message}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Responsibilities</label>
              {responsibilities.map((responsibility, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={responsibility}
                    onChange={(e) => updateResponsibility(index, e.target.value)}
                    placeholder="Add a responsibility"
                    className="input mr-2"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeResponsibility(index)}
                    className="text-gray-500"
                  >
                    <X size={18} />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="ghost" size="sm" onClick={addResponsibility} className="mt-2">
                <Plus size={16} className="mr-1" />
                Add Responsibility
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
              {requirements.map((requirement, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={requirement}
                    onChange={(e) => updateRequirement(index, e.target.value)}
                    placeholder="Add a requirement"
                    className="input mr-2"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRequirement(index)}
                    className="text-gray-500"
                  >
                    <X size={18} />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="ghost" size="sm" onClick={addRequirement} className="mt-2">
                <Plus size={16} className="mr-1" />
                Add Requirement
              </Button>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => navigate(`/projects/${id}`)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default EditProjectPage
