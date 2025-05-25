import type { Projet as BaseProjet } from "@/types"
import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown, ExternalLink, Github } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

type Projet = BaseProjet

export default function ProjetCard({ projet }: { projet: Projet }) {
  const [expanded, setExpanded] = useState(false)

  if (!projet) {
    return <div className="text-center text-muted-foreground">Chargement...</div>
  }

  return (
    <motion.div
      key={projet.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
      className="flex"
    >
      <Card className="flex flex-1 flex-col border border-border/40 bg-[#1f2a3d] backdrop-blur-sm transition-all duration-300 hover:border-border/80 hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 bg-gradient-to-br from-slate-700 to-slate-900 text-white">
              <AvatarFallback>{projet.title.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{projet.title}</CardTitle>
              <CardDescription>Projet personnel</CardDescription>
            </div>
          </div>
        </CardHeader>

        <div className="relative aspect-video overflow-hidden">
          <img
            src={projet.image?.startsWith("http") ? projet.image : `/storage/${projet.image}`}
            alt={projet.title}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        <CardContent className="flex-1 pt-4">
          <p className="text-sm text-muted-foreground">{projet.description}</p>

          {Array.isArray(projet.technologies) && projet.technologies.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {projet.technologies.map((tech, techIndex) => (
                <Badge key={techIndex} variant="outline" className="bg-background/50 text-xs font-normal">
                  {tech}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t border-border/40 pt-3">
          <div className="flex gap-2">
            {projet.github_link && (
              <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0" asChild>
                <a
                  href={projet.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Voir sur GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            )}

            {projet.demo_link && (
              <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0" asChild>
                <a href={projet.demo_link} target="_blank" rel="noopener noreferrer" aria-label="Voir la démo">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>

          <Collapsible
            open={expanded}
            onOpenChange={() => setExpanded((prev) => !prev)}
            className="w-full"
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="ml-auto h-8 w-8 rounded-full p-0">
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
                <span className="sr-only">Voir plus</span>
              </Button>
            </CollapsibleTrigger>

            <CollapsibleContent className="overflow-hidden pt-2">
              <div className="rounded-md border border-border/40 bg-muted/50 p-3">
                <h4 className="mb-2 text-sm font-medium">Détails supplémentaires</h4>
                <p className="text-xs text-muted-foreground">
                  {projet.additionalContent ||
                    "Ceci est une section de contenu additionnel que tu peux personnaliser."}
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
