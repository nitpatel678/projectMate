import { useState } from "react"
import { Search } from "lucide-react"
import { motion } from "framer-motion"

const SearchBar = ({ onSearch, placeholder = "Search...", className = "" }) => {
  const [query, setQuery] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full h-12 pl-12 pr-4 rounded-lg bg-gray-100 border-2 border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all duration-200"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search size={20} className="text-gray-500" />
        </div>
        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <div className="bg-primary text-white p-1.5 rounded-md">
            <Search size={16} />
          </div>
        </motion.button>
      </div>
    </form>
  )
}

export default SearchBar
