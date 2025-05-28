import ContactForm from '@/components/contactForm/ContactForm';
import Footer from '@/components/footer/footer';
import VideoHeader from '@/components/header/VideoHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Projet, Skills, User } from '@/types';
import { usePage } from '@inertiajs/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useEffect, useRef } from 'react';
import ResponsiveAppBar from '../components/header/ResponsiveAppBar';
import ProjetCard from '../components/projets/ProjetCard';
import BadgeSecondary from '../components/ui/badgeSecondary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useTheme } from '../context/ThemeContext';
import ExperienceCard from './experiences/show';
import BadgeExperiences from '../components/ui/badgeExperiences';
import BadgeCompetences from '@/components/ui/badgeCompetences';

export interface PageProps {
    user: User | null; // L'utilisateur peut être null si non trouvé
    skills: Skills[];
    experiences?: Experience[];
    projets?: Projet[]; // Assurez-vous que 'projets' est bien défini dans vos props
    [key: string]: any; // Permet d'ajouter d'autres propriétés dynamiques si nécessaire
}

type Experience = {
    id?: number;
    title: string;
    company: string;
    start_date: string;
    end_date?: string | null;
    description?: string;
};

type DashboardProps = {
    experiences?: Experience[];
};

type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

const Welcome = () => {
    const { user, skills, experiences, projets } = usePage<{
        user: User | null;
        skills: Skills[];
        experiences?: Experience[];
        projets?: Projet[];
    }>().props;

    // Fonction pour afficher le niveau en français, et couleur badge
    const getLevelBadgeColor = (level: SkillLevel) => {
        switch (level) {
            case 'beginner':
                return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
            case 'intermediate':
                return 'bg-yellow-200 text-yellow-800 hover:bg-yellow-100';
            case 'advanced':
                return 'bg-green-100 text-green-800 hover:bg-green-100';
            default:
                return '';
        }
    };

    const getLevelInFrench = (level: SkillLevel) => {
        switch (level) {
            case 'beginner':
                return 'Débutant';
            case 'intermediate':
                return 'Intermédiaire';
            case 'advanced':
                return 'Avancé';
            default:
                return level;
        }
    };

    // Hook pour le thème
    const { theme } = useTheme(); // récupère le thème (dark | light)

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    // Grouper les compétences par catégorie
    const groupedSkills =
        skills?.reduce(
            (acc, skill) => {
                const category = skill.category || 'Autre';
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(skill);
                return acc;
            },
            {} as Record<string, Skills[]>,
        ) || {};

    // Obtenir les catégories
    const categories = Object.keys(groupedSkills);

    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, -100]);

    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="min-h-screen bg-transparent text-black dark:text-white">
            {/* Vidéo de fond */}
            <div className="fixed inset-0 z-0">
                <video src="/video/4954760_Coll_halloween_Dusty_6144x3456.mp4" autoPlay muted loop className="h-full w-full object-cover" />
            </div>

            {/* Contenu principal au-dessus de la vidéo */}
            <div className="relative z-10" id="home">
                <ResponsiveAppBar />

                {/* Bloc de présentation utilisateur */}
                <div ref={containerRef} className="relative h-[53rem] overflow-hidden md:h-[53rem] lg:h-[48rem] xl:h-[52rem] 2xl:h-[63rem]">
                    <motion.div className="ata-[state=active]:text-blue-500m-transparent absolute inset-0 bg-gradient-to-b to-[#0F172A]/50">
                        <VideoHeader />
                    </motion.div>

                    {user ? (
                        <motion.div
                            initial={{ scale: 0.3, opacity: 0, y: 200, filter: 'blur(10px)' }}
                            animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                            className="relative perspective-[2000px]"
                        >
                            <div className="absolute inset-x-0 top-10 z-10 flex flex-col items-center justify-center gap-20 px-4 sm:top-14 sm:px-8 md:top-28 md:px-12 lg:top-40 lg:flex-row lg:px-20 2xl:top-52 2xl:gap-40">
                                {/* Photo de profil */}
                                <div className="relative">
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.8, ease: 'easeOut' }}
                                        // className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#769fa3]/30 to-[#2f2f2f]/30 backdrop-blur-2xl opacity-50"
                                        className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#186970]/30 to-[#1d2f59]/30 opacity-25 blur-sm"
                                    />
                                    <motion.img
                                        initial={{ scale: 0.6, opacity: 0, y: 100, filter: 'blur(10px)' }}
                                        animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
                                        transition={{ duration: 1.2, ease: 'easeOut' }}
                                        src={user.photo}
                                        alt={`${user.name}'s photo`}
                                        // className="h-32 w-32 object-cover shadow-md shadow-amber-50 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 xl:h-80 xl:w-80 2xl:h-2/5 2xl:w rounded-full"
                                        className="relative h-32 w-32 rounded-full object-cover shadow-md shadow-amber-50 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 xl:h-80 xl:w-80 2xl:h-96 2xl:w-96"
                                    />
                                </div>

                                {/* Infos utilisateur */}
                                <motion.div
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 1.2, delay: 0.3 }}
                                    className="flex flex-col items-start justify-center gap-4 rounded-lg bg-[#1E293B]/50 p-6 text-left backdrop-blur-sm sm:gap-6"
                                >
                                    <Badge className="mb-2 bg-blue-500/50 px-3 py-1 tracking-wider dark:text-blue-300">Développeur Full Stack</Badge>

                                    <motion.h2
                                        style={{ fontFamily: 'PPEditorialNew' }}
                                        initial={{ y: 100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 1.2, delay: 0.3 }}
                                        className="text-2xl font-bold text-[#DDEEFF] sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl"
                                    >
                                        {user.name}
                                    </motion.h2>

                                    <p
                                        style={{ fontFamily: 'PPEditorialNew' }}
                                        className="text-xl leading-[130%] font-medium tracking-tighter text-white/80 italic md:text-2xl"
                                    >
                                        Du code propre pour des projets ambitieux !
                                    </p>

                                    <div className="mt-4 flex gap-4">
                                        <a href="/CV_Yassin_El_Yattouti_27MAI.pdf" download>
                                            <Button
                                                variant="outline"
                                                className="rounded-full border-blue-400 bg-[#102b45] text-blue-300 hover:bg-blue-400/20 hover:text-blue-200"
                                            >
                                                Télécharger CV
                                            </Button>
                                        </a>

                                        <a href="mailto:yasscodeur1.0@gmail.com">
                                            <Button
                                                variant="outline"
                                                className="rounded-full border-blue-400 bg-[#102b45] text-blue-300 hover:bg-blue-400/20 hover:text-blue-200"
                                            >
                                                <Mail className="mr-2 h-4 w-4" /> Contact
                                            </Button>
                                        </a>
                                        <a href="https://github.com/Yasscodeur1?tab=repositories">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="rounded-full border border-blue-300 text-blue-300 hover:bg-blue-400/20 hover:text-blue-200"
                                            >
                                                <Github className="h-5 w-5" />
                                            </Button>
                                        </a>
                                        <a href="https://www.linkedin.com/in/yassin-el-yattouti/">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="rounded-full border border-blue-300 text-blue-300 hover:bg-blue-400/20 hover:text-blue-200"
                                            >
                                                <Linkedin className="h-5 w-5" />
                                            </Button>
                                        </a>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Bio */}
                            <motion.div
                                initial={{ x: 200, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="absolute inset-x-0 top-[40rem] z-10 mx-8 md:mx-20 lg:mx-32 xl:mx-52 2xl:mx-64 2xl:mt-50"
                            >
                                <div className="rounded-lg bg-[#1E293B]/30 p-6 text-center backdrop-blur-sm md:mt-10 lg:-mt-10">
                                    <h2 style={{ fontFamily: 'PPEditorialNew' }} className="text-[#DDEEFF] xl:text-2xl 2xl:text-3xl">
                                        {user.bio}
                                    </h2>
                                </div>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <div className="text-white">Utilisateur non trouvé</div>
                    )}
                </div>

                {/* SECTION PROJETS */}
                <section className="z-10 container mx-auto px-4" id="projets">
                    <div className="flex flex-col items-center">
                        <div className="mt-20 -mb-16">
                            <BadgeSecondary />
                        </div>
                    </div>
                    <div className="mt-10 grid grid-cols-1 gap-6 rounded-2xl border-t border-t-gray-300 px-4 py-20 shadow-lg md:grid-cols-2 lg:grid-cols-3 dark:shadow-blue-900/50">
                        {projets && projets.map((projet) => <ProjetCard key={projet.id} projet={projet} />)}
                    </div>
                </section>

                {/* <section>
                    <DirectionBlock />
                </section> */}

                {/* SECTION COMPÉTENCES */}
                <section className="z-10 container border-t rounded-2xl mx-auto mt-20 px-4" id="competences">
                    <div className="mb-12 text-center">
                        <h2 style={{ fontFamily: 'PPEditorialNew' }} className="mb-3 text-4xl font-bold text-white">
                            <div className="mb-14 -mt-[31px] text-center">
                                <BadgeCompetences />
                            </div>
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-blue-200/80">
                            Mes outils et technologies pour créer des applications performantes et modernes
                        </p>
                    </div>

                    {/* Tabs */}
                    {categories.length > 0 ? (
                        <Tabs defaultValue={categories[0]} className="w-full">
                            <TabsList className="mb-8 flex w-full justify-center gap-2 bg-transparent">
                                {categories.map((category) => (
                                    <TabsTrigger
                                        key={category}
                                        value={category}
                                        className="font-black text-slate-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-500/20 dark:data-[state=active]:text-blue-500"
                                    >
                                        {category.toUpperCase()[0] + category.slice(1)}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            {categories.map((category) => (
                                <TabsContent key={category} value={category} className="mt-0">
                                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                        {groupedSkills[category].map((skill) => (
                                            <motion.div
                                                key={skill.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 1 }}
                                                viewport={{ once: true }}
                                            >
                                                <Card className="overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-blue-900/20 dark:bg-[#1E293B]">
                                                    <CardHeader className="pb-2">
                                                        <CardTitle className="flex items-center justify-between text-xl">
                                                            {skill.name}
                                                            <Badge className={getLevelBadgeColor(skill.level as SkillLevel)}>
                                                                {getLevelInFrench(skill.level as SkillLevel)}
                                                            </Badge>
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="mt-2 flex items-center gap-3">
                                                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-700">
                                                                <motion.div
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: `${skill.percentage}%` }}
                                                                    transition={{ duration: 1 }}
                                                                    className="h-full rounded-full bg-gradient-to-r from-blue-400 to-emerald-500"
                                                                />
                                                            </div>
                                                            <span className="w-10 text-right text-sm font-medium text-white">
                                                                {skill.percentage}%
                                                            </span>
                                                        </div>
                                                        {skill.description && <p className="mt-4 text-sm text-gray-300">{skill.description}</p>}
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        ))}
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    ) : (
                        <p className="text-center dark:text-white">Aucune compétence trouvée.</p>
                    )}
                </section>

                {/* SECTION EXPÉRIENCES */}
                <section className="z-10 container mx-auto border-t rounded-2xl my-40 px-4" id="experiences">
                    <div className="mb-14 -mt-[31px] text-center">
                        <BadgeExperiences />        
                    </div>
                    <h2 style={{ fontFamily: 'PPEditorialNew' }} className="mb-10 text-center text-3xl font-bold text-white">
                        Expériences professionnelles
                    </h2>
                    {Array.isArray(experiences) && experiences.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {experiences.map((exp) => (
                                <ExperienceCard key={exp.id} experience={exp} />
                            ))}
                        </div>
                    ) : (
                        <p>Aucune expérience trouvée.</p>
                    )}
                </section>

                {/* SECTION CONTACT */}
                <section className="z-10 container mx-auto border-t rounded-2xl px-4" id="contact">
                    <ContactForm />
                </section>

                {/* FOOTER */}
                <div className="z-10">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Welcome;
