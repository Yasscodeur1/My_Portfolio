import { Head, useForm } from '@inertiajs/react';
import type { Auth, Skill } from '@/types';
import AuthenticatedLayout from '../../layouts/AuthenticatedLayout';
import { route } from 'ziggy-js';

interface Props {
    auth: Auth;
    skill: Skill;
}

export default function EditSkill({ auth, skill }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: skill.name || '',
        category: skill.category || '',
        level: skill.level || '',
        percentage: skill.percentage || 0,
        logo: skill.logo || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route('skills.update', skill.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Modifier la compétence</h2>}
        >
            <Head title="Modifier une compétence" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Nom */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={data.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                    {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
                                </div>

                                {/* Catégorie */}
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Catégorie</label>
                                    <select
                                        name="category"
                                        id="category"
                                        value={data.category}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    >
                                        <option value="">-- Choisir --</option>
                                        <option value="frontend">Frontend</option>
                                        <option value="backend">Backend</option>
                                        <option value="fullstack">Fullstack</option>
                                        <option value="design">Design</option>
                                    </select>
                                    {errors.category && <p className="text-red-600 text-sm">{errors.category}</p>}
                                </div>

                                {/* Niveau */}
                                <div>
                                    <label htmlFor="level" className="block text-sm font-medium text-gray-700">Niveau</label>
                                    <select
                                        name="level"
                                        id="level"
                                        value={data.level}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    >
                                        <option value="">-- Choisir --</option>
                                        <option value="beginner">Débutant</option>
                                        <option value="intermediate">Intermédiaire</option>
                                        <option value="advanced">Avancé</option>
                                    </select>
                                    {errors.level && <p className="text-red-600 text-sm">{errors.level}</p>}
                                </div>

                                {/* Pourcentage */}
                                <div>
                                    <label htmlFor="percentage" className="block text-sm font-medium text-gray-700">Pourcentage</label>
                                    <input
                                        type="number"
                                        name="percentage"
                                        id="percentage"
                                        value={data.percentage}
                                        onChange={handleChange}
                                        min={0}
                                        max={100}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                    {errors.percentage && <p className="text-red-600 text-sm">{errors.percentage}</p>}
                                </div>

                                {/* Logo */}
                                <div>
                                    <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Logo (URL)</label>
                                    <input
                                        type="text"
                                        name="logo"
                                        id="logo"
                                        value={data.logo}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                    {errors.logo && <p className="text-red-600 text-sm">{errors.logo}</p>}
                                </div>

                                {/* Bouton */}
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 disabled:opacity-50"
                                    >
                                        {processing ? 'Mise à jour...' : 'Mettre à jour'}
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
