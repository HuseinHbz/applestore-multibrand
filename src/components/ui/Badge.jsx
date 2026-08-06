import { cn } from "@/lib/utils"

const badgeVariants = {
  default: "bg-apple-blue text-white",
  secondary: "bg-gray-100 text-gray-900",
  destructive: "bg-red-500 text-white",
  outline: "border border-gray-300 text-gray-700",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
}

export function Badge({ className, variant = "default", children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
