import { Auth } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AuthenticatedLayout from '../../layouts/AuthenticatedLayout';

interface FormData {
    title: string;
    description: string;
    github_link: string;
    demo_link: string;
    image: File | null;
    technologies: string[];
    [key: string]: string | string[] | File | null;
}

interface Props {
    auth: Auth;
    projet: {
        id: number;
        title: string;
        description: string;
        github_link: string;
        demo_link: string;
        image_url: string;
        technologies: string[];
    };
}

const availableTechnologies = [
    'React',
    'Vue',
    'NextJs',
    'Laravel',
    'HTML/css',
    'HTML/css/JavaScript',
    'Laravel/React',
];

export default function Edit({ auth, projet }: Props) {
    const { data, setData, put, processing, errors } = useForm<FormData>({
        title: projet.title,
        description: projet.description,
        github_link: projet.github_link,
        demo_link: projet.demo_link,
        image: null,
        technologies: projet.technologies || [],
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);
    };

    const handleTechnologiesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
        setData('technologies', selected);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Add _method to the form data
        setData('_method', 'PUT');
        put(route('projets.update', projet.id), {
            forceFormData: true,
            preserveScroll: true,
        });
    };


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Modifier le projet
                </h2>
            }
        >
            <Head title="Modifier le projet" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                                encType="multipart/form-data"
                            >
                                {/* Titre */}
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
                                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
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
                                        value={data.description}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                                </div>

                                {/* Technologies */}
                                <div>
                                    <label htmlFor="technologies" className="block text-sm font-medium text-gray-700">
                                        Technologies utilisées
                                    </label>
                                    <select
                                        id="technologies"
                                        multiple
                                        name="technologies"
                                        value={data.technologies}
                                        onChange={handleTechnologiesChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        {availableTechnologies.map((tech) => (
                                            <option key={tech} value={tech}>
                                                {tech}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.technologies && <p className="mt-1 text-sm text-red-600">{errors.technologies}</p>}
                                </div>

                                {/* Lien GitHub */}
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
                                    {errors.github_link && <p className="mt-1 text-sm text-red-600">{errors.github_link}</p>}
                                </div>

                                {/* Lien Démo */}
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
                                    {errors.demo_link && <p className="mt-1 text-sm text-red-600">{errors.demo_link}</p>}
                                </div>

                                {/* Image */}
                                <div>
                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                        Image du projet
                                    </label>
                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
                                        onChange={handleFileChange}
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
                                    />
                                    {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                                </div>

                                {/* Bouton */}
                                <div className="flex items-center justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                                    >
                                        {processing ? 'Mise à jour...' : 'Mettre à jour le projet'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
