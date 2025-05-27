import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/context/ThemeContext";

export default function BadgeSecondary() {
  const { theme } = useTheme();
  return <Badge style={{fontSize:'2rem', fontFamily: 'PPEditorialNew', paddingLeft: '20px', paddingRight: '20px', borderRadius:'30px'}} variant="secondary" className={`text-xs ${theme === 'dark' ? 'text-blue-200/80 bg-[#1f2a3d]' : 'text-gray-800 bg-slate-50'
  }`}>Projets !</Badge>
}
