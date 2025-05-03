import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { Provider } from "react-redux"
import { store } from "./store"
import { Toaster } from "react-hot-toast"

// Layout Components
import MainLayout from "./layouts/MainLayout"
import DashboardLayout from "./layouts/DashboardLayout"

// Pages
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import HomePage from "./pages/HomePage"
import ProjectDetailPage from "./pages/ProjectDetailPage"
import CreateProjectPage from "./pages/CreateProjectPage"
import EditProjectPage from "./pages/EditProjectPage"

// We will be creating this page later

// import ProfilePage from "./pages/ProfilePage"
import ApplicationPage from "./pages/ApplicationPage"
import CreatorDashboardPage from "./pages/dashboard/CreatorDashboardPage"
import ContributorDashboardPage from "./pages/dashboard/ContributorDashboardPage"
import NotFoundPage from "./pages/NotFoundPage"

// Auth Provider
import { AuthProvider } from "./contexts/AuthContext"

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <AnimatePresence mode="wait">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<LandingPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="home" element={<HomePage />} />
                <Route path="projects/:id" element={<ProjectDetailPage />} />
                {/* <Route path="profile/:id" element={<ProfilePage />} /> */}
              </Route>

              {/* Protected Routes */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route path="creator" element={<CreatorDashboardPage />} />
                <Route path="contributor" element={<ContributorDashboardPage />} />
                <Route path="create-project" element={<CreateProjectPage />} />
                <Route path="edit-project/:id" element={<EditProjectPage />} />
                <Route path="apply/:id" element={<ApplicationPage />} />
              </Route>

              {/* 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AnimatePresence>
        </Router>
        <Toaster position="top-right" />
      </AuthProvider>
    </Provider>
  )
}

export default App
