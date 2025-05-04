
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Filter, Grid, List } from "lucide-react"
import SearchBar from "../components/common/SearchBar"
import ProjectCard from "../components/common/ProjectCard"
import Button from "../components/common/Button"

// Mock data - replace with API calls
import { projects } from "../data/mockData"

const HomePage = () => {
  const [viewMode, setViewMode] = useState("grid")
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [filters, setFilters] = useState({
    category: "",
    isPaid: null,
    skills: [],
  })
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredProjects(projects)
      return
    }

    const results = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase()) ||
        project.category.toLowerCase().includes(query.toLowerCase()) ||
        project.requiredSkills.some((skill) => skill.toLowerCase().includes(query.toLowerCase())),
    )

    setFilteredProjects(results)
  }

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const applyFilters = () => {
    let results = [...projects]

    if (filters.category) {
      results = results.filter((project) => project.category === filters.category)
    }

    if (filters.isPaid !== null) {
      results = results.filter((project) => project.isPaid === filters.isPaid)
    }

    if (filters.skills.length > 0) {
      results = results.filter((project) => filters.skills.some((skill) => project.requiredSkills.includes(skill)))
    }

    setFilteredProjects(results)
  }

  useEffect(() => {
    applyFilters()
  }, [filters])

  const categories = ["Web Development", "Mobile Development", "UI/UX Design", "Data Science", "Machine Learning"]
  const skills = ["React", "Node.js", "Python", "JavaScript", "UI/UX", "Figma", "MongoDB", "Express"]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 font-geologica">Discover Projects</h1>
        <SearchBar onSearch={handleSearch} placeholder="Search projects..." className="w-full md:w-96 font-calibri" />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 bg-white rounded-xl shadow-sm p-6 h-fit sticky top-20">
          <h2 className="text-lg font-semibold mb-4 font-geologica">Filters</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2 font-poppins">Category</h3>
              <select
                className="input font-poppins"
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2 font-poppins">Project Type</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="projectType"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    checked={filters.isPaid === null}
                    onChange={() => handleFilterChange("isPaid", null)}
                  />
                  <span className="ml-2 text-sm text-gray-700">All</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="projectType"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    checked={filters.isPaid === true}
                    onChange={() => handleFilterChange("isPaid", true)}
                  />
                  <span className="ml-2 text-sm text-gray-700">Paid</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="projectType"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    checked={filters.isPaid === false}
                    onChange={() => handleFilterChange("isPaid", false)}
                  />
                  <span className="ml-2 text-sm text-gray-700">Free</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2 font-poppins">Skills</h3>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <label key={skill} className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      checked={filters.skills.includes(skill)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleFilterChange("skills", [...filters.skills, skill])
                        } else {
                          handleFilterChange(
                            "skills",
                            filters.skills.filter((s) => s !== skill),
                          )
                        }
                      }}
                    />
                    <span className="ml-2 text-sm text-gray-700">{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button
              variant="orange" className="text-poppins"
              size="sm"
              onClick={() => {
                setFilters({
                  category: "",
                  isPaid: null,
                  skills: [],
                })
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="md:hidden mr-2" onClick={() => setShowFilters(!showFilters)}>
                <Filter size={18} className="mr-2" />
                Filters
              </Button>

              <p className="text-gray-600">
                Showing <span className="font-medium">{filteredProjects.length}</span> projects
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                className={`p-2 rounded-md ${viewMode === "grid" ? "bg-gray-200" : "bg-white"}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid size={18} />
              </button>
              <button
                className={`p-2 rounded-md ${viewMode === "list" ? "bg-gray-200" : "bg-white"}`}
                onClick={() => setViewMode("list")}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Category</h3>
                  <select
                    className="input"
                    value={filters.category}
                    onChange={(e) => handleFilterChange("category", e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Project Type</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="mobileProjectType"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                        checked={filters.isPaid === null}
                        onChange={() => handleFilterChange("isPaid", null)}
                      />
                      <span className="ml-2 text-sm text-gray-700">All</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="mobileProjectType"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                        checked={filters.isPaid === true}
                        onChange={() => handleFilterChange("isPaid", true)}
                      />
                      <span className="ml-2 text-sm text-gray-700">Paid</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="mobileProjectType"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                        checked={filters.isPaid === false}
                        onChange={() => handleFilterChange("isPaid", false)}
                      />
                      <span className="ml-2 text-sm text-gray-700">Free</span>
                    </label>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFilters({
                        category: "",
                        isPaid: null,
                        skills: [],
                      })
                    }}
                  >
                    Clear Filters
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => setShowFilters(false)}>
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Projects Grid/List */}
          {filteredProjects.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2 font-poppins">No projects found</h3>
              <p className="text-gray-600 mb-4 font-calibri">Try adjusting your filters or search criteria.</p>
              <Button
                variant="orange"
                onClick={() => {
                  setFilters({
                    category: "",
                    isPaid: null,
                    skills: [],
                  })
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}
            >
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage
