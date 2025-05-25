import { useState } from "react";
import { router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '../../layouts/AuthenticatedLayout';
import { Auth } from "@/types";
import { Button } from '@headlessui/react';

interface Props {
    auth: Auth;
}

const CreateExperience = ({ auth }: Props) => {
    const [values, setValues] = useState({
        title: '',
        company: '',
        description: '',
        start_date: '',
        end_date: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.post(route('experiences.store'), values, {
            onError: (errors) => setErrors(errors),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Créer une expérience</h2>}
        >
            <Head title="Créer une expérience" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Titre */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        Titre
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        value={values.title}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                    )}
                                </div>

                                {/* Entreprise */}
                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                                        Entreprise
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        id="company"
                                        value={values.company}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.company && (
                                        <p className="mt-1 text-sm text-red-600">{errors.company}</p>
                                    )}
                                </div>

                                {/* Date de début */}
                                <div>
                                    <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                                        Date de début
                                    </label>
                                    <input
                                        type="date"
                                        name="start_date"
                                        id="start_date"
                                        value={values.start_date}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.start_date && (
                                        <p className="mt-1 text-sm text-red-600">{errors.start_date}</p>
                                    )}
                                </div>

                                {/* Date de fin */}
                                <div>
                                    <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
                                        Date de fin (optionnelle)
                                    </label>
                                    <input
                                        type="date"
                                        name="end_date"
                                        id="end_date"
                                        value={values.end_date}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.end_date && (
                                        <p className="mt-1 text-sm text-red-600">{errors.end_date}</p>
                                    )}
                                </div>

                                {/* Description */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        rows={4}
                                        value={values.description}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                    )}
                                </div>

                                {/* Bouton */}
                                <div className="flex items-center justify-end">
                                    <Button 
                                        type="submit"
                                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                        >
                                            Créer l'expérience
                                    </Button>
                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CreateExperience;
