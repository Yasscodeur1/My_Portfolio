import { Github, Linkedin, Mail } from "lucide-react"
import VideoFooter from "./videoFooter"

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-800 dark:text-slate-300 shadow-md border-t border-t-gray-200 py-5 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div><VideoFooter /></div>
        {/* Branding */}
        <div>
          
          <h2 className="text-2xl font-bold dark:text-white tracking-wide">Yass<span className="text-blue-400">Codeur</span></h2>
          <p className="mt-2 text-slate-400 text-sm max-w-xs">
            Développeur full stack passionné. Du code propre, des idées claires, et des projets ambitieux.
          </p>
        </div>

        {/* Liens rapides */}
        <div className="space-y-10">
          <div>
          <h3 className="text-sm font-semibold dark:text-white uppercase mb-3">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#about" className="hover:text-blue-400 transition">À propos</a></li>
            <li><a href="#projets" className="hover:text-blue-400 transition">Projets</a></li>
            <li><a href="#competences" className="hover:text-blue-400 transition">Compétences</a></li>
            <li><a href="#contact" className="hover:text-blue-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Réseaux */}
        <div>
          <h3 className="text-sm font-semibold text-white uppercase mb-3">Suivez-moi</h3>
          <div className="flex space-x-4">
            <a href="mailto:yasscodeur1.0@gmail.com" className="hover:text-blue-400 transition">
              <Mail className="h-5 w-5" />
            </a>
            <a href="https://github.com/Yasscodeur1" target="_blank" className="hover:text-blue-400 transition">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/yassin-el-yattouti/" target="_blank" className="hover:text-blue-400 transition">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
        </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-700 mt-10 pt-6 text-sm text-center text-slate-500">
        © {new Date().getFullYear()} YassCodeur. Tous droits réservés.
      </div>
    </footer>
  )
}
