import { Head, useForm } from '@inertiajs/react';
import { Auth } from '@/types';
import AuthenticatedLayout from '../../layouts/AuthenticatedLayout';
import { route } from 'ziggy-js';
import { Button } from '@headlessui/react';

interface FormData {
    title: string;
    description: string;
    github_link: string;
    demo_link: string;
    image: File | null;
    [key: string]: string | File | null;
}

interface Props {
    auth: Auth;
}

export default function Create({ auth }: Props) {
    const { data, setData, post, processing, errors } = useForm<FormData>({
        title: '',
        description: '',
        github_link: '',
        demo_link: '',
        image: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(name as keyof FormData, value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('projets.store'), { // ici la route avec 'projets' au lieu de 'projects'
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Créer un projet</h2>} // titre en français
        >
            <Head title="Créer un projet" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        Titre
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        value={data.title}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        rows={4}
                                        value={data.description}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="github_link" className="block text-sm font-medium text-gray-700">
                                        Lien GitHub
                                    </label>
                                    <input
                                        type="url"
                                        name="github_link"
                                        id="github_link"
                                        value={data.github_link}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.github_link && (
                                        <p className="mt-1 text-sm text-red-600">{errors.github_link}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="demo_link" className="block text-sm font-medium text-gray-700">
                                        Lien Démo
                                    </label>
                                    <input
                                        type="url"
                                        name="demo_link"
                                        id="demo_link"
                                        value={data.demo_link}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.demo_link && (
                                        <p className="mt-1 text-sm text-red-600">{errors.demo_link}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                        Image du projet
                                    </label>
                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
                                        onChange={handleFileChange}
                                        className="mt-1 block w-full text-sm text-gray-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-md file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-indigo-50 file:text-indigo-700
                                            hover:file:bg-indigo-100"
                                    />
                                    {errors.image && (
                                        <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-end">
                                    <Button 
                                                                            type="submit"
                                                                            disabled={processing}
                                                                            className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                                                            >
                                                                                {processing ? 'Création en cours...' : 'Créer le projet'}
                                                                        </Button>
                                    {/* <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                                    >
                                        {processing ? 'Création en cours...' : 'Créer le projet'}
                                    </button> */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

