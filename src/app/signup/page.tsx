import Image from "next/image";
import Link from "next/link";


export default function Signup() {
    return (
        <div className="min-h-screen bg-transparent flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-pink-600">Sign up for an account. It&apos;s free!</h2>
                <p className="mt-2 text-center text-sm text-gray-400 max-w">Or <Link href="/login" className="font-medium text-gray-300 hover:text-white">login</Link>.</p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-transparent py-8 px-4 shadow sm:rounded-lg rounded-xl sm:px-10 border-2 border-pink-600">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                                Email
                            </label>
                            <div className="mt-1">
                                <input id="email" name="email" type="email" autoComplete="email" required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border bg-transparent border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter your email" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                                Password
                            </label>
                            <div className="mt-1">
                                <input id="password" name="password" type="password" autoComplete="current-password" required
                                    className="appearance-none rounded-md bg-transparent relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter your password" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-slate-950 bg-pink-700 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Sign Up
                            </button>
                        </div>
                    </form>
                    <div className="mt-6">

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gradient-to-r from-slate-950 to-black text-gray-500">OR</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-3 gap-3">
                            <div>
                                <a href="#"
                                    className="w-full flex items-center justify-center px-8 py-2 border border-pink-600 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-pink-700 hover:bg-pink-600">
                                    <Image height={24} width={24} src="https://www.svgrepo.com/show/512120/facebook-176.svg" alt="" />
                                </a>
                            </div>
                            <div>
                                <a href="#"
                                    className="w-full flex items-center justify-center px-8 py-2 border border-pink-600 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-pink-700 hover:bg-pink-600">
                                    <Image height={24} width={24} src="https://www.svgrepo.com/show/513008/twitter-154.svg" alt="" />
                                </a>
                            </div>
                            <div>
                                <a href="#"
                                    className="w-full flex items-center justify-center px-8 py-2 border border-pink-700 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-pink-700 hover:bg-pink-600">
                                    <Image height={24} width={24} src="https://www.svgrepo.com/show/506498/google.svg" alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
