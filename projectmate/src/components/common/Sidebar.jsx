import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Home,
  PlusCircle,
  Users,
  Briefcase,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()

  const isCreator = user?.role === "creator"

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const isActive = (path) => location.pathname === path

  const sidebarVariants = {
    expanded: { width: "240px" },
    collapsed: { width: "80px" },
  }

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      path: isCreator ? "/dashboard/creator" : "/dashboard/contributor",
    },
    {
      title: "Projects",
      icon: Briefcase,
      path: "/dashboard/projects",
    },
    {
      title: isCreator ? "Create Project" : "My Applications",
      icon: isCreator ? PlusCircle : Users,
      path: isCreator ? "/dashboard/create-project" : "/dashboard/applications",
    },
    {
      title: "Messages",
      icon: MessageSquare,
      path: "/dashboard/messages",
    },
    {
      title: "Notifications",
      icon: Bell,
      path: "/dashboard/notifications",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ]

  return (
    <motion.div
      className="h-screen bg-white border-r border-gray-200 flex flex-col"
      variants={sidebarVariants}
      animate={isCollapsed ? "collapsed" : "expanded"}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <Link to="/" className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900 font-montserrat tracking-wide">Project Mate</h1>
          </Link>
        )}
        <button
          onClick={toggleSidebar}
          className={`p-1 rounded-full hover:bg-gray-100 ${isCollapsed ? "mx-auto" : ""}`}
        >
          <ChevronRight
            size={20}
            className={`transform transition-transform ${isCollapsed ? "rotate-180" : ""} text-orange-400`}
          />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`
                  flex items-center p-2 rounded-lg transition-colors
                  ${isActive(item.path) ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}
                `}
              >
                <item.icon size={20} className={`text-orange-400 ${isCollapsed ? "mx-auto" : "mr-3"}`} />
                {!isCollapsed && <span className="font-poppins">{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center p-2 w-full rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <LogOut size={20} className={`text-orange-400 ${isCollapsed ? "mx-auto" : "mr-3"}`} />
          {!isCollapsed && <span className="font-poppins">Logout</span>}
        </button>
      </div>
    </motion.div>
  )
}

export default Sidebar
