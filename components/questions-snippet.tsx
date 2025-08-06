import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HelpCircle, ShieldCheck, AlertTriangle, Flame } from "lucide-react"

export default function QuestionsSnippet() {
  const questionCategories = [
    {
      title: "Gas Safety",
      description: "Essential questions about gas safety checks, regulations, and keeping your home safe",
      icon: <ShieldCheck className="h-8 w-8 text-green-600" />,
      href: "/questions/gas-safety",
      color: "border-green-200 hover:border-green-300"
    },
    {
      title: "Smoke Alarms",
      description: "Important information about smoke alarm installation, testing, and maintenance",
      icon: <AlertTriangle className="h-8 w-8 text-orange-600" />,
      href: "/questions/smoke-alarms", 
      color: "border-orange-200 hover:border-orange-300"
    },
    {
      title: "Carbon Monoxide",
      description: "Critical safety information about CO detection, symptoms, and prevention",
      icon: <Flame className="h-8 w-8 text-red-600" />,
      href: "/questions/carbon-monoxide",
      color: "border-red-200 hover:border-red-300"
    }
  ]

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="h-10 w-10 text-secondary mr-3" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Safety Questions & Answers
            </h2>
          </div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get expert answers to your most important safety questions. Our comprehensive guides 
            help keep your home and family safe.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
          {questionCategories.map((category, index) => (
            <Card key={index} className={`transition-all duration-300 hover:shadow-lg ${category.color}`}>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-white p-3 shadow-sm">
                    {category.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    {category.description}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white"
                  >
                    <Link href={category.href}>
                      View Questions
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            className="bg-secondary text-white hover:bg-secondary/90"
          >
            <Link href="/questions">
              View All Safety Questions
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
