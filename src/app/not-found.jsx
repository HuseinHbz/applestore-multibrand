import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">😕</div>
        <h1 className="text-4xl font-bold text-apple-dark mb-4">۴۰۴</h1>
        <h2 className="text-xl font-semibold text-gray-600 mb-4">صفحه مورد نظر یافت نشد</h2>
        <p className="text-gray-500 mb-8">
          ممکن است این صفحه حذف شده یا آدرس آن تغییر کرده باشد.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="rounded-full">
              <Home className="w-4 h-4 mr-2" />
              بازگشت به خانه
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" className="rounded-full">
              <Search className="w-4 h-4 mr-2" />
              مشاهده محصولات
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
