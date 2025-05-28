import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/context/ThemeContext"

export default function BadgeSecondary() {
  const {theme} = useTheme()
  return <Badge  style={{fontSize:'1.7rem', fontFamily: 'PPEditorialNew', paddingLeft: '20px', paddingRight: '20px', borderRadius:'30px',  marginBottom: '20px'}} className={`m-1 ${theme === 'dark' ? 'text-blue-200/80 bg-[#1f2a3d]' : 'text-gray-800 bg-slate-50'
  }`} variant="secondary"><div className={`m-1 ${theme === 'dark' ? 'text-blue-200/80 bg-[#1f2a3d]' : 'text-gray-800 bg-slate-50'
  }`}>
    Compétences </div></Badge>
}

// className="mb-4 text-4xl font-bold dark:text-slate-100"