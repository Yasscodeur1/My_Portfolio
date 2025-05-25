import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '../../layouts/AuthenticatedLayout';
import { User } from '@/types';
import { Button } from '@headlessui/react'

interface Props {
    auth: {
        user: User;
    };
    users: User[];
}

export default function Index({ auth, users }: User & Props) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>}
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-[#e5e7eb] overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-4">
                                
                                {/* <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700  px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700">
                                    <a
                                        href={route('users.create')}
                                        className="text-white font-bold py-2 px-4 rounded"
                                    >
                                        Add New User
                                    </a>
                                </Button> */}
                            </div>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-500">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Username</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Bio</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{user.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate">
                                                <div className="text-sm text-gray-900">{user.bio}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <a href={route('users.edit', user.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                    Edit
                                                </a>
                                                <button className="text-red-600 hover:text-red-900">
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