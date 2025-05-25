import { User } from '@/types';
import { usePage } from '@inertiajs/react';

const Welcome = () => {
    const { user } = usePage<{ user: User }>().props; // On récupère l'utilisateur depuis les props

    console.log('User Data:', user);

    return (
        <div>
            {/* <ResponsiveAppBar /> */}
            <div className="relative mt-20 h-80 bg-transparent lg:h-[30rem]">
                {user ? (
                    <div className="-gap-6 absolute top-[-30] left-0 z-50 mx-20 flex flex-col items-center justify-start px-4 md:top-[-90] md:flex-row md:px-10 lg:top-[-120px] lg:flex-row lg:-bg-conic-90 lg:px-20 xl:top-[-180px]">
                        <img src={user.avatar || '/images/profile2.png'} alt={`${user.name}'s photo`} className="h-2/5 w-2/4 2xl:w-1/4" />
                        <div className="flex flex-col items-start justify-center gap-6 xl:mt-40">
                            <div className="text-3xl font-bold text-gray-50">
                                <h2 className="text-2xl font-bold text-[#DDEEFF] md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-7xl">{user.name}</h2>
                                <h2 className="text-2xl font-bold text-[#DDEEFF] md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-7xl">
                                    {user.username as string}
                                </h2>
                                <h2 className="text-2xl font-bold text-[#DDEEFF] md:text-3xl xl:mt-5">Développeur Full Stack</h2>
                            </div>
                            <h2 className="text-2xl font-bold text-[#DDEEFF] md:text-3xl xl:mt-20">Du code propre pour des projets ambitieux !</h2>

                            <h2 className="text-[#DDEEFF]">{user.email}</h2>
                            <h2 className="text-[#DDEEFF]">{String(user.bio)}</h2>
                        </div>
                    </div>
                ) : (
                    <div>Utilisateur non trouvé</div> // Si l'utilisateur n'est pas récupéré
                )}

                <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, overflow: 'hidden' }}>
                    <img className="m-20 mr-20 rounded-3xl object-cover shadow-lg" src="/backgroundImage/80041.jpg" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Welcome;
