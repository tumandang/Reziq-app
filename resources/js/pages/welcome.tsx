import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';
import { register } from '@/routes';
import AppLogo from '@/components/app-logo-icon';
import GridDistortion from '@/components/GridDistortion';
import { Box } from 'lucide-react';
import { Features } from '@/components/features';
import { Howitworks } from '@/components/howitworks';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';

export default function Welcome() {
    const { auth } = usePage().props;


    return (
        <>
            <Head title="Welcome" />
            <div className="relative flex max-h-screen w-full flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:p-8 lg:pt-0 dark:bg-[#0a0a0a] mb-56">

                <div className=" absolute inset-0 z-0 ">
                    <GridDistortion
                        imageSrc="/img/reziqHero.jpg"
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
                <div className="absolute inset-0 bg-linear-to-b from-[#0A111A] via-[#0A111A]/40 to-[#0A111A]"></div>
                <header className="relative  z-10 mb-6 w-full text-sm not-has-[nav]:hidden max-w-7xl mx-auto p-6 lg:p-8 ">

                    <nav className="relative flex w-full items-center justify-between gap-4 rounded-3xl px-10 bg-white/60 border border-black/5 shadow-sm backdrop-blur-md dark:bg-white/5 dark:border-white/10 dark:shadow-none">
                        <Link href='/' className='flex items-center justify-center'>
                            <AppLogo className='h-16 w-16' />
                            <h1 className='text-2xl font-light text-neutral-800 dark:text-slate-200 font-suez-one '>Rezeqi</h1>
                        </Link>


                        <div className="flex items-center justify-end gap-4">

                            <a href="#features" className='text-[#1b1b18] hover:text-green-600 dark:text-[#EDEDEC] dark:hover:text-green-400 rounded-md px-3 py-2 font-medium font-lexend transition duration-300 ease-in-out'>
                                Features
                            </a>
                            <a href="#how-it-works" className='text-[#1b1b18] hover:text-green-600 dark:text-[#EDEDEC] dark:hover:text-green-400 rounded-md px-3 py-2 font-medium font-lexend transition duration-300 ease-in-out'>
                                How it Works
                            </a>
                            <a href="#contact" className='text-[#1b1b18] hover:text-green-600 dark:text-[#EDEDEC] dark:hover:text-green-400 rounded-md px-3 py-2 font-medium font-lexend transition duration-300 ease-in-out'>
                                Contact
                            </a>
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
                                        className="text-[#1b1b18] hover:text-green-600 dark:text-[#EDEDEC] dark:hover:text-green-400 rounded-md px-3 py-2 font-medium font-lexend transition duration-300 ease-in-out"
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
                <div className="relative z-10 flex mt-16 w-full items-start justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0  ">
                    <section className="flex w-full flex-col-reverse lg:flex-row lg:max-w-7xl mx-auto p-6 lg:p-8 justify-center">
                        <div className="flex flex-col justify-center items-center space-y-7">
                            <div className="bg-white/60 border border-black/5 shadow-sm backdrop-blur-md flex justify-center items-center p-2 rounded-4xl gap-x-2 dark:bg-white/5 dark:border-white/10 dark:shadow-none">
                                <div className="bg-white rounded-4xl px-2 py-1 font-lexend font-bold"><Box className='text-green-900' /></div>
                                <p className='font-normal font-dm-sans text-gray-700 dark:text-gray-300'>Platform that helps small businesses manage their products, stock, and orders, in one place.</p>
                            </div>
                            <div className="text-4xl font-lexend font-semibold text-white text-center">Your Business, Better <span className='text-green-600'>Organized</span>, <br /> Every Step of the Way.</div>
                            <Link href={register()} className="inline-block rounded-md px-5 py-1.5 text-sm leading-normal text-[#1b1b18] bg-green-800 hover:text-[#EDEDEC]   dark:text-[#EDEDEC] dark:hover:border-[#62605b] dark:hover:bg-[#EDEDEC] dark:hover:text-[#1b1b18] font-lexend transition duration-300 ease-in-out items-center"
                            >
                                Get Started
                            </Link>
                            <div className="mx-auto w-full max-w-6xl">

                                <div className="absolute -inset-4 rounded-3xl bg-[#0F3D5C]/10 blur-3xl" />


                                <div className="relative overflow-hidden rounded-xl bg-white shadow-2xl shadow-[#0F3D5C]/15 dark:bg-[#111111] dark:shadow-black/40">
                                    {/* Light mode */}
                                    <img
                                        src="/img/dashboardReziq-Light.png"
                                        alt="Reziq Dashboard Preview"
                                        className="block h-auto w-full object-contain dark:hidden"
                                    />
                                    {/* Dark mode */}
                                    <img
                                        src="/img/dashboardPreview.png"
                                        alt="Reziq Dashboard Preview"
                                        className="hidden h-auto w-full object-contain dark:block"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
            <Features />
            <Howitworks />
            <Contact />
            <Footer />




        </>
    );
}
