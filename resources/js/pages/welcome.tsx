import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';
import { register } from '@/routes';
import AppLogo from '@/components/app-logo-icon';
import GridDistortion from '@/components/GridDistortion';

export default function Welcome() {
    const { auth } = usePage().props;


    return (
        <>
            <Head title="Welcome" />
            <div style={{ width: '100%', height: '600px', position: 'relative' }} className="flex min-h-screen min-w-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 lg:pt-0 dark:bg-[#0a0a0a]">
                <div className=" absolute inset-0 z-0 ">
                    <GridDistortion
                        imageSrc="/img/heroReziq.jpg"
                        grid={25}
                        radius={0.18}
                        strength={0.10}
                        relaxation={0.96}
                        mode="drag"
                        softness={0}
                        chroma={0}
                        idle={0.3}
                        clickRipple
                        intro
                        style={{ with: '100%', height: '100%' }}
                    />
                </div>

                <header className="relative  z-10 mb-6 w-full text-sm not-has-[nav]:hidden max-w-7xl mx-auto p-6 lg:p-8 ">

                    <nav className="fixed max-w-7xl w-full rounded-3xl flex items-center justify-between gap-4 px-10
    bg-white/60 border border-black/5 shadow-sm backdrop-blur-md
    dark:bg-white/5 dark:border-white/10 dark:shadow-none">
                        <Link href='/' className='flex items-center justify-center'>
                            <AppLogo className='h-16 w-16' />
                            <h1 className='text-2xl font-light text-neutral-800 dark:text-slate-200 font-suez-one '>Rezeqi</h1>
                        </Link>
                        <div className="flex justify-center items-center">
                            <Link href='/' className=' text-[#1b1b18] hover:text-gray-600 dark:text-[#EDEDEC] dark:hover:text-gray-400 rounded-md px-3 py-2 font-medium font-lexend transition duration-300 ease-in-out'>
                                Home
                            </Link>
                            <Link className='text-[#1b1b18] hover:text-gray-600 dark:text-[#EDEDEC] dark:hover:text-gray-400 rounded-md px-3 py-2 font-medium font-lexend transition duration-300 ease-in-out'>
                                Features
                            </Link>
                            <Link className='text-[#1b1b18] hover:text-gray-600 dark:text-[#EDEDEC] dark:hover:text-gray-400 rounded-md px-3 py-2 font-medium font-lexend transition duration-300 ease-in-out'>
                                About
                            </Link>
                            <Link className='text-[#1b1b18] hover:text-gray-600 dark:text-[#EDEDEC] dark:hover:text-gray-400 rounded-md px-3 py-2 font-medium font-lexend transition duration-300 ease-in-out'>
                                Contact
                            </Link>
                        </div>
                        <div className="flex items-center justify-end gap-4">

                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-block rounded-2xl border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:bg-[#1b1b18] hover:text-[#EDEDEC]  dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b] dark:hover:bg-[#EDEDEC] dark:hover:text-[#1b1b18] font-lexend transition duration-300 ease-in-out"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="text-[#1b1b18] hover:text-gray-600 dark:text-[#EDEDEC] dark:hover:text-gray-400 rounded-md px-3 py-2 font-medium font-lexend transition duration-300 ease-in-out"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="inline-block rounded-2xl border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:bg-[#1b1b18] hover:text-[#EDEDEC]  dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b] dark:hover:bg-[#EDEDEC] dark:hover:text-[#1b1b18] font-lexend transition duration-300 ease-in-out"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>

                    </nav>
                </header>
                <div className="relative z-10 flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0 bg-[url('/images/herobg.jpg')] bg-no-repeat bg-center bg-cover ">
                    <main className="flex w-full  flex-col-reverse lg:flex-row lg:max-w-7xl mx-auto p-6 lg:p-8">

                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
