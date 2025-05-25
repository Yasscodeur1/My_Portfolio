import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import type { Auth } from '@/types';
import AuthenticatedLayout from '../../layouts/AuthenticatedLayout';
import { route } from 'ziggy-js';

interface FormData {
    title: string;
    company: string;
    description: string;
    start_date: string;
    end_date: string;
    [key: string]: string;
}
interface Props {
    auth: Auth;
}

export default function CreateExperience({ auth }: { auth: Auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title:'',
        company: '',
        description:'',
        start_date: '',
        end_date: ''
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('skills.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Skill</h2>}
        >
            <Head title="Create Skill" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Title
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
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Descreption
                                    </label>
                                    <input
                                        type="text"
                                        name="description"
                                        id="description"
                                        value={data.description}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Start_date
                                    </label>
                                    <input
                                        type="start_date"
                                        name="start_date"
                                        id="name"
                                        value={data.start_date}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.start_date && (
                                        <p className="mt-1 text-sm text-red-600">{errors.start_date}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        End_date
                                    </label>
                                    <input
                                        type="text"
                                        name="end_date"
                                        id="end_date"
                                        value={data.end_date}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.end_date && (
                                        <p className="mt-1 text-sm text-red-600">{errors.end_date}</p>
                                    )}
                                </div>

                                {/* Submit */}
                                <div className="flex items-center justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                                    >
                                        {processing ? 'Creating...' : 'Create Experience'}
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
