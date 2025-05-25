import { Badge } from "@/components/ui/badge"

export default function BadgeSecondary() {
  return <Badge style={{fontSize:'2rem', backgroundColor:'#25b3c3', paddingLeft: '20px', paddingRight: '20px', borderRadius:'30px', fontWeight: 'bold', marginBottom: '20px', boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"}} variant="secondary"><div className="mb-2 border-b-2 border-blue-50">
    Contact</div></Badge>
}

// className="mb-4 text-4xl font-bold dark:text-slate-100"