import { motion } from "framer-motion"
import Button from "../components/common/Button"

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button as="link" to="/" variant="primary">
            Go to Home
          </Button>
          <Button as="link" to="/home" variant="outline">
            Browse Projects
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFoundPage
