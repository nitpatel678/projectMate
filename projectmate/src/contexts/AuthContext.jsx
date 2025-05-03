import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: "1",
          name: "John Doe",
          email,
          role: "creator",
          avatar: "/placeholder-avatar.png",
        }
        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))
        resolve(mockUser)
      }, 1000)
    })
  }

  const register = async (email, password, userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: "1",
          name: userData.name,
          email,
          role: userData.role,
          avatar: "/placeholder-avatar.png",
        }
        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))
        resolve(mockUser)
      }, 1000)
    })
  }

  const loginWithGoogle = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: "2",
          name: "Google User",
          email: "google@example.com",
          role: "contributor",
          avatar: "/placeholder-avatar.png",
        }
        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))
        resolve(mockUser)
      }, 1000)
    })
  }

  const loginWithGithub = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: "3",
          name: "GitHub User",
          email: "github@example.com",
          role: "contributor",
          avatar: "/placeholder-avatar.png",
        }
        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))
        resolve(mockUser)
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const value = {
    user,
    loading,
    login,
    register,
    loginWithGoogle,
    loginWithGithub,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
