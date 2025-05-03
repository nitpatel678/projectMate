import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { GitlabIcon as GitHub, Mail } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import Button from "../../components/common/Button"
import Input from "../../components/common/Input"

const schema = yup
  .object({
    name: yup.string().required("Full name is required"),
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    role: yup.string().required("Please select a role"),
  })
  .required()

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { register: registerUser, loginWithGoogle, loginWithGithub } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      role: "contributor",
    },
  })

  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      setError(null)
      await registerUser(data.email, data.password, {
        name: data.name,
        role: data.role,
      })
      navigate("/home")
    } catch (err) {
      setError(err.message || "Failed to register. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)
      setError(null)
      await loginWithGoogle()
      navigate("/home")
    } catch (err) {
      setError(err.message || "Failed to register with Google. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGithubLogin = async () => {
    try {
      setIsLoading(true)
      setError(null)
      await loginWithGithub()
      navigate("/home")
    } catch (err) {
      setError(err.message || "Failed to register with GitHub. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create an account</h2>
          <p className="mt-2 text-gray-600">Join Project Mate to find collaborators and exciting projects</p>
        </div>

        {error && <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">{error}</div>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="Full Name"
              id="name"
              type="text"
              autoComplete="name"
              error={errors.name?.message}
              {...register("name")}
            />

            <Input
              label="Email Address"
              id="email"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              label="Password"
              id="password"
              type="password"
              autoComplete="new-password"
              error={errors.password?.message}
              {...register("password")}
            />

            <Input
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">I want to</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="creator"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    {...register("role")}
                  />
                  <span className="ml-2 text-sm text-gray-700">Create Projects</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="contributor"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    {...register("role")}
                  />
                  <span className="ml-2 text-sm text-gray-700">Join Projects</span>
                </label>
              </div>
              {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>}
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{" "}
                <a href="#" className="font-medium text-primary hover:text-primary-dark">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="font-medium text-primary hover:text-primary-dark">
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>

          <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button type="button" variant="outline" onClick={handleGoogleLogin} disabled={isLoading}>
              <Mail size={18} className="mr-2" />
              Google
            </Button>

            <Button type="button" variant="outline" onClick={handleGithubLogin} disabled={isLoading}>
              <GitHub size={18} className="mr-2" />
              GitHub
            </Button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default RegisterPage
