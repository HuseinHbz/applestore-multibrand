"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export function StarRating({ rating, max = 5, size = "sm", interactive = false, onRate }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.floor(rating)
        const half = !filled && i < rating

        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRate?.(i + 1)}
            className={cn(
              "transition",
              interactive && "hover:scale-110 cursor-pointer"
            )}
          >
            <Star
              className={cn(
                sizeClasses[size],
                filled
                  ? "fill-yellow-400 text-yellow-400"
                  : half
                  ? "fill-yellow-400/50 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              )}
            />
          </button>
        )
      })}
      {rating > 0 && (
        <span className="text-sm text-gray-500 mr-1">
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  )
}
