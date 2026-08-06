export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full" />
          <div className="absolute inset-0 border-4 border-apple-blue border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-gray-500 text-sm">در حال بارگذاری...</p>
      </div>
    </div>
  )
}
