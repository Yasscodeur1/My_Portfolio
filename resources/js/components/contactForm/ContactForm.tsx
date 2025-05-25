import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone } from 'lucide-react';
import Fonds from '../../../../public/images/Interface 2.png';
import BadgeContact from '../../components/ui/BadgeContact';

export default function Component() {
    return (
        <div className="min-h-screen dark:bg-black px-4 mt-10">
            <div className="top-4/67 left-1/5 mx-auto max-w-4xl">
                <div className="flex flex-col items-center mt-12">
                    <div className="mb-14 -mt-20 ">
                        <BadgeContact />
                    </div>
                </div>
                <div className="mb-20 text-center">
                    {/* <BadgeContact /> */}
                    {/* <h1 className="mb-4 text-4xl font-bold dark:text-slate-100">Contact</h1> */}
                    <p className="mx-auto max-w-2xl text-lg text-slate-500">
                        Vous avez un projet en tête ? N'hésitez pas à me contacter pour en discuter.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {/* Informations de contact */}
                    <div className="space-y-8">
                        <Card className="bg-transparent/50 shadow-sm">
                            <CardHeader>
                                <CardTitle className="dark:text-slate-100">Informations de contact</CardTitle>
                                <CardDescription className="dark:text-slate-100">Retrouvez-moi via ces différents canaux</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="rounded-lg bg-slate-900 p-3">
                                        <Mail className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-300 dark:text-gray-500">Email</p>
                                        <p className="dark:text-slate-100">yasscodeur1.0@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="rounded-lg bg-slate-900 p-3">
                                        <Phone className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-300 dark:text-gray-500">Téléphone</p>
                                        <p className="dark:text-slate-100">+32 487 88 00 98</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="rounded-lg bg-slate-900 p-3">
                                        <MapPin className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-300 dark:text-gray-500">Localisation</p>
                                        <p className="dark:text-slate-100">Bruxelles, Belgique</p>
                                    </div>
                                </div>
                            </CardContent>
                            <div className="p-4 dark:block">
                                <img src={Fonds} alt="" className="shadow-sm border-gray-50 rounded-2xl p-10" />
                            </div>
                        </Card>
                    </div>
                    

                    {/* Formulaire de contact */}
                    <Card className="bg-transparent shadow-sm">
                        <CardHeader>
                            <CardTitle className="dark:text-slate-100">Envoyez-moi un message</CardTitle>
                            <CardDescription className="dark:text-slate-100">Je vous répondrai dans les plus brefs délais</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName" className="font-medium text-slate-700">
                                            Prénom
                                        </Label>
                                        <Input
                                            id="firstName"
                                            placeholder="Votre prénom"
                                            className="border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName" className="font-medium text-slate-700">
                                            Nom
                                        </Label>
                                        <Input
                                            id="lastName"
                                            placeholder="Votre nom"
                                            className="border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="font-medium text-slate-700">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="votre.email@exemple.com"
                                        className="border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject" className="font-medium text-slate-700">
                                        Sujet
                                    </Label>
                                    <Input
                                        id="subject"
                                        placeholder="Objet de votre message"
                                        className="border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="font-medium text-slate-700">
                                        Message
                                    </Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Décrivez votre projet ou votre demande..."
                                        rows={5}
                                        className="resize-none border-slate-300 focus:border-slate-900 focus:ring-slate-900"
                                    />
                                </div>

                                <Button type="submit" className="w-full bg-slate-900 py-3 font-medium text-white hover:bg-slate-800">
                                    Envoyer le message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                    
                </div>
            </div>
        </div>
    );
}
