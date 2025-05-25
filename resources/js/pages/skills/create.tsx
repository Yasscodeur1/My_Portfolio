import type { Auth, Skills } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '../../layouts/AuthenticatedLayout';
import { Button } from '@headlessui/react';

export default function CreateSkill({ auth }: { auth: Auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        level: '',
        percentage: 0,
        category: '',
        logo: null,
    });

    // 
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, type } = e.target;

        if (type === 'file') {
            const file = (e.target as HTMLInputElement).files?.[0];
            setData(name, file ?? null);
        } else {
            const value = type === 'range' ? parseInt(e.target.value) : e.target.value;
            setData(name, value);
        }
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('skills.store'), {
            forceFormData: true, // permet d’envoyer les fichiers
        });
    };

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Create Skill</h2>}>
            <Head title="Create Skill" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Skill Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={data.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>

                                {/* Category */}
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                                    <select

                                        name="category"
                                        id="category"
                                        value={data.category}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="">Select a category</option>
                                        <option value="frontend">Front_end</option>
                                        <option value="backend">Back_end</option>
                                        <option value="fullstack">Full_stack</option>
                                        <option value="design">Design</option>
                                    </select>
                                    {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                                </div>

                                {/* Level */}
                                <div>
                                    <label htmlFor="level" className="block text-sm font-medium text-gray-700">Level</label>
                                    <select
                                        name="level"
                                        id="level"
                                        value={data.level}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="">Select level</option>
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                    {errors.level && <p className="mt-1 text-sm text-red-600">{errors.level}</p>}
                                </div>

                                {/* Percentage */}
                                <div>
                                    <label htmlFor="percentage" className="block text-sm font-medium text-gray-700">Percentage (0-100)</label>
                                    <input
                                        type="range"
                                        name="percentage"
                                        id="percentage"
                                        value={data.percentage}
                                        onChange={handleChange}
                                        min={0}
                                        max={100}
                                        className="mt-1 block w-full"
                                    />
                                    <div className="mt-1 text-sm text-gray-500">{data.percentage}%</div>
                                    {errors.percentage && <p className="mt-1 text-sm text-red-600">{errors.percentage}</p>}
                                </div>

                                <div>
                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                        Project Image
                                    </label>
                                    <input
                                        type="file"
                                        name="logo"
                                        id="logo"
                                        onChange={handleChange}
                                        className="mt-1 block w-full text-sm text-gray-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-md file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-indigo-50 file:text-indigo-700
                                            hover:file:bg-indigo-100"
                                    />
                                    {errors.logo && (
                                        <p className="mt-1 text-sm text-red-600">{errors.logo}</p>
                                    )}
                                </div>

                                {/* Submit */}
                                <div className="flex items-center justify-end">
                                     <Button 
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                        >
                                            {processing ? 'Creating...' : 'Create Skill'}
                                        </Button>
                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
