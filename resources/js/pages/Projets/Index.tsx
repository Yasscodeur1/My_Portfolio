import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '../../layouts/AuthenticatedLayout';
import { Auth, Project } from '@/types';
import { route } from 'ziggy-js';
import { Button } from '@headlessui/react';
import { Inertia } from '@inertiajs/inertia';

interface Props {
    auth: Auth;
    projets: Project[]; // renommé pour cohérence
}

export default function Index({ auth, projets }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
            Inertia.delete(route('projets.destroy', id));
        }
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Projets</h2>}
        >
            <Head title="Projets" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-[#e5e7eb] overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-4">
                                <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700">
                                <a
                                    href={route('projets.create')}
                                    className=" text-white font-bold py-2 px-4 rounded"
                                >
                                    Add New Project
                                </a>
                                </Button>
                            </div>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-500">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Image</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Titre</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Liens</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {projets.map((projet) => (
                                        <tr key={projet.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <img 
                                                    src={projet.image} 
                                                    alt={projet.title} 
                                                    className="h-10 w-10 rounded-full object-cover"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{projet.title}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900 line-clamp-2">{projet.description}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex space-x-2">
                                                    <a href={projet.github_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900">
                                                        GitHub
                                                    </a>
                                                    <a href={projet.demo_link} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-900">
                                                        Démo
                                                    </a>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <a href={route('projets.edit', projet.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                    Edit
                                                </a>
                                                <button 
                                                    onClick={() => handleDelete(projet.id)}
                                                    className="text-red-600 hover:text-red-900">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
