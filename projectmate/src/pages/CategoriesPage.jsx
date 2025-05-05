"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Code,
  Palette,
  Database,
  Brain,
  Briefcase,
  Megaphone,
  LineChart,
  BookOpen,
  Camera,
  Music,
  Film,
  Globe,
  Search,
  ChevronRight,
} from "lucide-react"
import Button from "../components/common/Button"
import SearchBar from "../components/common/SearchBar"
import ProjectCard from "../components/common/ProjectCard"

// Mock data - replace with API calls
import { projects } from "../data/mockData"

const CategoriesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [filteredProjects, setFilteredProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    {
      id: "web-development",
      name: "Web Development",
      icon: Code,
      color: "bg-blue-500",
      description: "Frontend and backend web development projects using modern frameworks and technologies.",
      skills: ["React", "Angular", "Vue", "Node.js", "Django", "Ruby on Rails"],
    },
    {
      id: "mobile-development",
      name: "Mobile Development",
      icon: Globe,
      color: "bg-green-500",
      description: "Native and cross-platform mobile app development for iOS and Android.",
      skills: ["React Native", "Flutter", "Swift", "Kotlin", "Xamarin"],
    },
    {
      id: "ui-ux-design",
      name: "UI/UX Design",
      icon: Palette,
      color: "bg-purple-500",
      description: "User interface and experience design for web, mobile, and desktop applications.",
      skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"],
    },
    {
      id: "data-science",
      name: "Data Science",
      icon: Database,
      color: "bg-indigo-500",
      description: "Data analysis, visualization, and machine learning projects.",
      skills: ["Python", "R", "SQL", "Tableau", "Power BI", "Pandas"],
    },
    {
      id: "machine-learning",
      name: "Machine Learning",
      icon: Brain,
      color: "bg-yellow-500",
      description: "AI and machine learning projects for various applications and industries.",
      skills: ["TensorFlow", "PyTorch", "Scikit-learn", "NLP", "Computer Vision"],
    },
    {
      id: "business",
      name: "Business",
      icon: Briefcase,
      color: "bg-gray-700",
      description: "Business strategy, planning, and management projects.",
      skills: ["Business Analysis", "Project Management", "Market Research", "Financial Modeling"],
    },
    {
      id: "marketing",
      name: "Marketing",
      icon: Megaphone,
      color: "bg-red-500",
      description: "Digital marketing, SEO, content creation, and social media projects.",
      skills: ["SEO", "Content Marketing", "Social Media", "Email Marketing", "Analytics"],
    },
    {
      id: "analytics",
      name: "Analytics",
      icon: LineChart,
      color: "bg-teal-500",
      description: "Data analytics and business intelligence projects.",
      skills: ["Google Analytics", "Data Visualization", "SQL", "Excel", "Statistical Analysis"],
    },
    {
      id: "education",
      name: "Education",
      icon: BookOpen,
      color: "bg-pink-500",
      description: "Educational content, courses, and learning platforms.",
      skills: ["Curriculum Development", "E-learning", "Instructional Design", "LMS"],
    },
    {
      id: "photography",
      name: "Photography",
      icon: Camera,
      color: "bg-gray-800",
      description: "Photography, editing, and visual content creation projects.",
      skills: ["Photography", "Photoshop", "Lightroom", "Visual Storytelling"],
    },
    {
      id: "music",
      name: "Music",
      icon: Music,
      color: "bg-orange-500",
      description: "Music production, composition, and audio engineering projects.",
      skills: ["Production", "Composition", "Audio Engineering", "Sound Design"],
    },
    {
      id: "video",
      name: "Video Production",
      icon: Film,
      color: "bg-blue-700",
      description: "Video production, editing, and animation projects.",
      skills: ["Video Editing", "Animation", "Motion Graphics", "Filmmaking"],
    },
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      // Filter projects by category
      const filtered = projects.filter(
        (project) => project.category.toLowerCase() === selectedCategory.name.toLowerCase(),
      )
      setFilteredProjects(filtered)
    } else {
      setFilteredProjects([])
    }
  }, [selectedCategory])

  const handleSearch = (query) => {
    setSearchQuery(query)

    if (!query.trim()) {
      // If search is cleared, reset to selected category or empty
      if (selectedCategory) {
        const filtered = projects.filter(
          (project) => project.category.toLowerCase() === selectedCategory.name.toLowerCase(),
        )
        setFilteredProjects(filtered)
      } else {
        setFilteredProjects([])
      }
      return
    }

    // Search within selected category or all projects
    const projectsToSearch = selectedCategory
      ? projects.filter((project) => project.category.toLowerCase() === selectedCategory.name.toLowerCase())
      : projects

    const results = projectsToSearch.filter(
      (project) =>
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase()) ||
        project.requiredSkills.some((skill) => skill.toLowerCase().includes(query.toLowerCase())),
    )

    setFilteredProjects(results)
  }

  const getProjectCountByCategory = (categoryName) => {
    return projects.filter((project) => project.category.toLowerCase() === categoryName.toLowerCase()).length
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-12 bg-gray-200 rounded mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Categories</h1>
            <p className="text-gray-600">Browse projects by category or search for specific skills and technologies</p>
          </div>
          <SearchBar onSearch={handleSearch} placeholder="Search categories or skills..." className="w-full md:w-96" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`
                bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 
                hover:shadow-md transition-all duration-200 cursor-pointer
                ${selectedCategory?.id === category.id ? "ring-2 ring-primary" : ""}
              `}
              onClick={() => setSelectedCategory(category)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center text-white`}>
                    <category.icon size={24} />
                  </div>
                  <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {getProjectCountByCategory(category.name)} projects
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{category.description}</p>
                <div className="flex items-center text-primary text-sm font-medium">
                  View Category <ChevronRight size={16} className="ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Category Details */}
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className={`${selectedCategory.color} h-24 flex items-center px-8`}>
                <div className="flex items-center">
                  <selectedCategory.icon size={32} className="text-white mr-4" />
                  <h2 className="text-2xl font-bold text-white">{selectedCategory.name}</h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{selectedCategory.description}</p>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Common Skills:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1.5 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {searchQuery ? `Search Results in ${selectedCategory.name}` : `Projects in ${selectedCategory.name}`}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCategory(null)
                  setFilteredProjects([])
                  setSearchQuery("")
                }}
              >
                Clear Selection
              </Button>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <Search size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery
                    ? `No projects matching "${searchQuery}" in ${selectedCategory.name} category.`
                    : `There are no projects in the ${selectedCategory.name} category yet.`}
                </p>
                <Link to="/dashboard/create-project">
                  <Button variant="primary">Create a Project</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* If no category is selected, show featured projects */}
        {!selectedCategory && !searchQuery && (
          <div>
            <h2 className="text-xl font-bold mb-6">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 6).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/home">
                <Button variant="primary">View All Projects</Button>
              </Link>
            </div>
          </div>
        )}

        {/* If search query but no category */}
        {!selectedCategory && searchQuery && (
          <div>
            <h2 className="text-xl font-bold mb-6">Search Results for "{searchQuery}"</h2>
            {filteredProjects.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <Search size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                <p className="text-gray-600 mb-4">
                  No projects matching "{searchQuery}" were found. Try a different search term.
                </p>
                <Button variant="primary" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default CategoriesPage
