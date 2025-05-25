import type { Projet  as BaseProjet} from "@/types"
import { usePage } from "@inertiajs/react"



type Projet = BaseProjet & {
  projets?: Projet[]
}


import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown, ExternalLink, Github } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"


export default function ProjetCard() {
  const { projet } = usePage<{ projet: Projet }>().props
  console.log("ProjetCard", projet)
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({})

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  if (!projet) {
    return <div className="text-center text-muted-foreground">Chargement...</div>
  }

  if (!projet.projets || projet.projets.length === 0) {
    return <div className="text-center text-muted-foreground">Aucun projet trouvé</div>
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 px-5">
      {projet.projets.map((projet, index) => (
        <motion.div
          key={projet.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
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
                src={projet.image || "/placeholder.svg"}
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
                open={expandedIds[String(projet.id)]}
                onOpenChange={() => toggleExpand(String(projet.id))}
                className="w-full"
              >
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="ml-auto h-8 w-8 rounded-full p-0">
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        expandedIds[String(projet.id)] ? "rotate-180" : ""
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
      ))}
    </div>
  )
}
