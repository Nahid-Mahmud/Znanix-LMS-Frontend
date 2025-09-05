const stats = [
  {
    number: "50,000+",
    label: "Active Students",
  },
  {
    number: "500+",
    label: "Expert Instructors",
  },
  {
    number: "1,200+",
    label: "Courses Available",
  },
  {
    number: "95%",
    label: "Completion Rate",
  },
]

export function StatsSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="text-4xl lg:text-5xl font-bold">{stat.number}</div>
              <div className="text-lg opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
