import { Outlet, Navigate } from "react-router-dom"
import Sidebar from "../components/common/Sidebar"
import { useAuth } from "../contexts/AuthContext"

const DashboardLayout = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
