import { forwardRef } from "react"

const Input = forwardRef(({ label, id, type = "text", error, className = "", fullWidth = true, ...props }, ref) => {
  return (
    <div className={`${fullWidth ? "w-full" : ""} mb-4`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        type={type}
        className={`
          input
          ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary"}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
})

export default Input
