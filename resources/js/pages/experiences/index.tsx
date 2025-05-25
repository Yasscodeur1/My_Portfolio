import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '../../layouts/AuthenticatedLayout';
import { User, Experience } from '@/types';
import { Button } from '@headlessui/react';
import { Inertia } from '@inertiajs/inertia';

interface Props {
    auth: {
        user: User;
    };
    experiences: Experience[];
}

export default function Index({ auth, experiences }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this experience?')) {
            Inertia.delete(route('experiences.destroy', id));
        }
    };
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Experiences</h2>}
        >
            <Head title="Experiences" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-[#e5e7eb] overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-4">
                                <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700">
                                    <a
                                        href={route('experiences.create')}
                                        className=" text-white font-bold py-2 px-4 rounded"
                                    >
                                        Add New Experience 
                                    </a>
                                </Button>
                            </div>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-500">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Company</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Period</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {experiences.map((experience) => (
                                        <tr key={experience.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{experience.title}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{experience.company}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {experience.start_date} - {experience.end_date || 'Present'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900 line-clamp-2">{experience.description}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <a href={route('experiences.edit', experience.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                    Edit
                                                </a>
                                                <button 
                                                    onClick={() => handleDelete(experience.id)}
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
