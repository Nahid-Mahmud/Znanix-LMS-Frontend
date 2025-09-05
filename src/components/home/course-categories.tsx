import { Card, CardContent } from "@/components/ui/card"
import { Code, Palette, TrendingUp, Camera, Brain, Wrench } from "lucide-react"

const categories = [
  {
    icon: Code,
    name: "Programming",
    courses: 150,
    color: "text-blue-600",
  },
  {
    icon: Palette,
    name: "Design",
    courses: 85,
    color: "text-purple-600",
  },
  {
    icon: TrendingUp,
    name: "Business",
    courses: 120,
    color: "text-green-600",
  },
  {
    icon: Camera,
    name: "Photography",
    courses: 45,
    color: "text-orange-600",
  },
  {
    icon: Brain,
    name: "Data Science",
    courses: 75,
    color: "text-red-600",
  },
  {
    icon: Wrench,
    name: "Engineering",
    courses: 60,
    color: "text-indigo-600",
  },
]

export function CourseCategories() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">Explore Categories</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Find courses in your area of interest
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <category.icon className={`h-8 w-8 ${category.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.courses} courses</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
