import type { Skills, User } from '@/types';
import { Button } from '@headlessui/react';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '../../layouts/AuthenticatedLayout';

interface Props {
    auth: {
        user: User;
    };
    skills: Skills[];
}

export default function Index({ auth, skills }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce skill ?')) {
            Inertia.delete(route('skills.destroy', id));
        }
    };
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Skills</h2>}>
            <Head title="Skills" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-[#e5e7eb] shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-4">
                                <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700">
                                    <a href={route('skills.create')} className="rounded px-4 py-2 font-bold text-white">
                                        Add New skill
                                    </a>
                                </Button>
                            </div>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-500">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-50 uppercase">Logo</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-50 uppercase">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-50 uppercase">Level</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-50 uppercase">Percentage</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-50 uppercase">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-50 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {skills.map((skill) => (
                                        <tr key={skill.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {skill.logo ? (
                                                    <img
                                                        src={`/storage/${skill.logo}`}
                                                        alt={skill.name}
                                                        className="h-10 w-10 rounded-2xl object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-sm text-gray-400 italic">No image</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{skill.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{skill.level}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{skill.percentage}%</div>
                                                <div className="h-2.5 w-full rounded-full bg-gray-200">
                                                    <div className="h-2.5 rounded-full bg-blue-600" style={{ width: `${skill.percentage}%` }}></div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{skill.category}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                                <a href={route('skills.edit', skill.id)} className="mr-4 text-indigo-600 hover:text-indigo-900">
                                                    Edit
                                                </a>
                                                <button 
                                                    onClick={() => handleDelete(skill.id)}
                                                    className="text-red-600 hover:text-red-900">Delete</button>
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
