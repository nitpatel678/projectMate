import { forwardRef } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      fullWidth = false,
      as = "button", // valid: 'button', 'a', 'div', etc.
      to,
      disabled = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "btn inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"

    const variants = {
      primary: "bg-primary text-white hover:bg-primary-dark focus:ring-primary",
      secondary: "bg-white text-primary border border-primary hover:bg-gray-50 focus:ring-primary",
      dark: "bg-secondary text-white hover:bg-gray-800 focus:ring-gray-800",
      outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
      ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
      orange: "bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500", // ✅ New variant
    }

    const sizes = {
      sm: "px-4 py-1.5 text-sm rounded-full",
      md: "px-6 py-2 text-base rounded-full",
      lg: "px-8 py-3 text-lg rounded-full",
    }

    const classes = `
      ${baseClasses}
      ${variants[variant] || ""}
      ${sizes[size] || ""}
      ${fullWidth ? "w-full" : ""}
      ${className}
    `

    if (as === "link" && to) {
      return (
        <Link to={to} className={classes} ref={ref} {...props}>
          {children}
        </Link>
      )
    }

    const MotionComponent = motion[as] || as

    return (
      <MotionComponent
        ref={ref}
        className={classes}
        disabled={disabled}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </MotionComponent>
    )
  }
)

export default Button
