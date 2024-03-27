"use client"
import React, { useState } from 'react';

const Header = ({isLoggedIn}:{isLoggedIn:Boolean}) => {
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-slate-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <a href="#" className="text-white text-lg font-bold">
                        NextJs Auth
                    </a>
                </div>
                <div className="hidden md:block">
                    <ul className="flex space-x-4">
                        <li>
                            <a href="/" className="text-white hover:text-gray-300">
                                Home
                            </a>
                        </li>
                        {isLoggedIn ? (
                            <li>
                            <a href="/profile" className="text-white hover:text-gray-300">
                                Profile
                            </a>
                        </li>
                            
                        ) : (
                            <li>
                            <a href="/login"  className="text-white hover:text-gray-300">
                                Login 
                            </a>
                        </li> 
                        ) }
                        
                        
                    </ul>
                </div>
                <div className="md:hidden">
                    <button
                        className="text-white focus:outline-none"
                        onClick={() => setOpen(!open)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                    {open && (
                        <div className="bg-gray-900 px-12 py-10 -z-10 absolute top-14 right-0 h-full">
                            <ul className="space-y-14">
                                <li>
                                    <a href="/" className="block text-white hover:text-gray-300 text-xl ">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="/signup" className="block text-white hover:text-gray-300 text-xl">
                                        Sign-up
                                    </a>
                                </li>
                                <li>
                                    <a href="/profile" className="block text-white hover:text-gray-300 text-xl">
                                        Profile
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
