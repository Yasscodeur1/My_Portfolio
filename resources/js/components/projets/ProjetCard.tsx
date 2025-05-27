import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useTheme } from '@/context/ThemeContext';
import type { Projet as BaseProjet } from '@/types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { ChevronDown, ExternalLink, Github } from 'lucide-react';
import { useState } from 'react';

type Projet = BaseProjet;

export default function ProjetCard({ projet }: { projet: Projet }) {
    const [expanded, setExpanded] = useState(false);
    const { theme } = useTheme();

    if (!projet) {
        return <div className="text-muted-foreground text-center">Chargement...</div>;
    }

    const cardStyle = {
        // maxWidth: 345,
        bgcolor: theme === 'dark' ? '#1f2a3d' : '#ffffff',
        color: theme === 'dark' ? 'white' : '#1f2a3d',
        transition: 'all 0.3s ease',
        '&:hover': {
            boxShadow: theme === 'dark' ? '0 0 15px rgba(59, 130, 246, 0.5)' : '0 0 15px rgba(0, 0, 0, 0.1)',
        },
    };

    const descriptionColor = theme === 'dark' ? '#94a3b8' : '#4b5563';

    return (
        <motion.div
            key={projet.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            style={{ margin: '1rem', borderRadius: '15px', overflow: 'hidden' }}
            className="flex border border-gray-200 dark:border-blue-100/30 shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
            <Card sx={cardStyle}>
                <div className="mt-3 ml-3 w-[calc(100%-1.5rem)]">
                    <CardMedia
                        component="img"
                        height="140"
                        image={projet.image?.startsWith('http') ? projet.image : `/storage/${projet.image}`}
                        alt={projet.title}
                        className="rounded-2xl object-cover transition-transform duration-500 hover:scale-105"
                    />
                </div>

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{ color: theme === 'dark' ? 'white' : '#1f2a3d' }}>
                        {projet.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: descriptionColor }}>
                        {projet.description}
                    </Typography>

                    {Array.isArray(projet.technologies) && projet.technologies.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                            {projet.technologies.map((tech, techIndex) => (
                                <Badge
                                    key={techIndex}
                                    variant="outline"
                                    className={`bg-background/50 text-xs font-normal ${
                                        theme === 'dark' ? 'border-blue-500/20 text-blue-300' : 'border-gray-300 text-gray-700'
                                    }`}
                                >
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                    )}
                </CardContent>
                <CardActions
                    className={`flex items-center justify-between border-t ${theme === 'dark' ? 'border-blue-500/20' : 'border-gray-200'} pt-3`}
                >
                    <div className="flex gap-2">
                        {projet.github_link && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`h-8 w-8 rounded-full p-0 ${
                                    theme === 'dark' ? 'text-blue-300 hover:bg-blue-400/20' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                                asChild
                            >
                                <a href={projet.github_link} target="_blank" rel="noopener noreferrer" aria-label="Voir sur GitHub">
                                    <Github className="h-4 w-4" />
                                </a>
                            </Button>
                        )}

                        {projet.demo_link && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`h-8 w-8 rounded-full p-0 ${
                                    theme === 'dark' ? 'text-blue-300 hover:bg-blue-400/20' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                                asChild
                            >
                                <a href={projet.demo_link} target="_blank" rel="noopener noreferrer" aria-label="Voir la démo">
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                            </Button>
                        )}
                    </div>

                    <Collapsible open={expanded} onOpenChange={() => setExpanded((prev) => !prev)} className="w-full">
                        <CollapsibleTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`ml-auto h-8 w-8 rounded-full p-0 ${
                                    theme === 'dark' ? 'text-blue-300 hover:bg-blue-400/20' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
                                <span className="sr-only">Voir plus</span>
                            </Button>
                        </CollapsibleTrigger>

                        <CollapsibleContent className="overflow-hidden pt-2">
                            <div
                                className={`rounded-md border p-3 ${
                                    theme === 'dark' ? 'border-blue-500/20 bg-blue-500/10' : 'border-gray-200 bg-gray-50'
                                }`}
                            >
                                <h4 className={`mb-2 text-sm font-medium ${theme === 'dark' ? 'text-blue-300' : 'text-gray-700'}`}>
                                    Détails supplémentaires
                                </h4>
                                <p className={`text-xs ${theme === 'dark' ? 'text-blue-200/80' : 'text-gray-600'}`}>
                                    {projet.additionalContent || 'Ceci est une section de contenu additionnel que tu peux personnaliser.'}
                                </p>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </CardActions>
            </Card>
        </motion.div>
    );
}
