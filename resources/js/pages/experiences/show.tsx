import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

type Experience = {
  id?: number
  title: string
  company: string
  start_date: string
  end_date?: string | null
  description?: string
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
  })
}

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  return (
    <Card className="bg-[#1E293B] text-white shadow-md hover:shadow-blue-800/30 transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {experience.title} <br />
          <span className="text-blue-400"> @ {experience.company}</span>
        </CardTitle>
        <p className="text-sm text-blue-200">
          {formatDate(experience.start_date)} –{" "}
          {experience.end_date ? formatDate(experience.end_date) : "Aujourd'hui"}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-300 whitespace-pre-line">{experience.description}</p>
      </CardContent>
    </Card>
  )
}

export default ExperienceCard
