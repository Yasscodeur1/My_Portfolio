import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone } from 'lucide-react';
import Fonds from '../../../../public/images/Interface_3.png';
// import FondOne from '../../../../public/images/Interface_1.png';
import BadgeContact from '../../components/ui/BadgeContact';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import { toast } from 'sonner';
import { useTheme } from '@/context/ThemeContext';

type ContactFormData = {
    firstname: string;
    lastname: string;
    email: string;
    subject: string;
    message: string;
};

export default function ContactForm() {
    const { data, setData, post, processing, errors, reset } = useForm<ContactFormData>({
        firstname: '',
        lastname: '',
        email: '',
        subject: '',
        message: '',
    });

    const isDark = useTheme().theme === 'dark';
    const cardStyle = isDark
        ? 'bg-gray-800 text-white shadow-sm'
        : 'bg-white text-gray-900 shadow-sm';       


    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('contact.store'), {
            onSuccess: () => {
                toast.success('Votre message a été envoyé avec succès !');
                reset();
            },
            onError: () => {
                toast.error('Une erreur est survenue lors de l\'envoi du message.');
            },
        });
    };

    return (
        <div className="mb-20 px-4 mt-10 ">
            <div className="top-4/67 left-1/5 mx-auto max-w-5xl">
                <div className="flex flex-col items-center mt-12">
                    <div className="mb-14 -mt-20 ">
                        <BadgeContact />
                    </div>
                </div>
                <div className="mb-20 text-center">
                    {/* <BadgeContact /> */}
                    {/* <h1 className="mb-4 text-4xl font-bold dark:text-slate-100">Contact</h1> */}
                    <p className="mx-auto max-w-2xl text-xl dark:text-slate-300">
                        Vous avez un projet en tête ? N'hésitez pas à me contacter pour en discuter.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {/* Informations de contact */}
                    <div className="space-y-8">
                        <Card className="bg-[#fcf5f5] dark:bg-slate-800 shadow-sm">
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
                                <img src={Fonds } alt="" className="border-gray-50 rounded-2xl" />
                            </div>
                        </Card>
                    </div>
                    

                    {/* Formulaire de contact */}
                    <Card className="bg-[#fcf5f5] dark:bg-slate-800 shadow-sm">
                        <CardHeader>
                            <CardTitle className="dark:text-slate-100">Envoyez-moi un message</CardTitle>
                            <CardDescription className="dark:text-slate-100">Je vous répondrai dans les plus brefs délais</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstname" className="font-medium text-slate-700 dark:text-slate-300">
                                            Prénom
                                        </Label>
                                        <Input
                                            type="text"
                                            id="firstname"
                                            value={data.firstname}
                                            onChange={(e) => setData('firstname', e.target.value)}
                                            placeholder="Votre prénom"
                                            className="border-slate-300 focus:border-slate-900 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                        />
                                        <InputError message={errors.firstname} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastname" className="font-medium text-slate-700 dark:text-slate-300">
                                            Nom
                                        </Label>
                                        <Input
                                            type='text'
                                            id="lastname"
                                            value={data.lastname}
                                            onChange={(e) => setData('lastname', e.target.value)}
                                            placeholder="Votre nom"
                                            required
                                            className="border-slate-300 focus:border-slate-900 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                        />
                                        <InputError message={errors.lastname} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="font-medium text-slate-700 dark:text-slate-300">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        placeholder="votre.email@exemple.com"
                                        className="border-slate-300 focus:border-slate-900 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject" className="font-medium text-slate-700 dark:text-slate-300">
                                        Sujet
                                    </Label>
                                    <Input
                                        id="subject"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        placeholder="Objet de votre message"
                                        className="border-slate-300 focus:border-slate-900 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />
                                    <InputError message={errors.subject} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="font-medium text-slate-700 dark:text-slate-300">
                                        Message
                                    </Label>
                                    <Textarea
                                        id="message"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        placeholder="Décrivez votre projet ou votre demande..."
                                        rows={5}
                                        className="resize-none border-slate-300 focus:border-slate-900 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />
                                    <InputError message={errors.message} />
                                </div>

                                <Button 
                                    type="submit" 
                                    className="w-full bg-slate-900 py-3 font-medium text-white hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700"
                                    disabled={processing}
                                >
                                    {processing ? 'Envoi en cours...' : 'Envoyer le message'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                    
                </div>
            </div>
        </div>
    );
}
