import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import ToggleDarkMode from "@/Components/ToggleDarkMode";
import { Link } from "@inertiajs/inertia-react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    return (
        <div className="min-h-screen relative">
            <nav className="shadow-md fixed top-0 left-0 right-0 z-50 bg-base-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Dashboard
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <ToggleDarkMode />
                            {auth?.user ? (
                                <>
                                    <button className="btn btn-ghost btn-circle">
                                        <ShoppingBagIcon className="h-6 w-6" />
                                    </button>
                                    <div className="relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md focus:outline-none transition ease-in-out duration-150"
                                                    >
                                                        <div className="avatar">
                                                            <div className="w-10 rounded-full">
                                                                <img
                                                                    src={
                                                                        auth
                                                                            .user
                                                                            .avatar
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    href={route("profile.edit")}
                                                >
                                                    Profile
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route("logout")}
                                                    method="post"
                                                    as="button"
                                                >
                                                    Log Out
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </>
                            ) : (
                                <div className="ml-3 space-x-4">
                                    <Link
                                        href={route("login")}
                                        className="btn btn-outline"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href={route("register")}
                                        className="btn btn-outline"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md  hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t">
                        {auth?.user ? (
                            <div className="px-4">
                                <div className="font-medium text-base">
                                    {auth?.user.name}
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    {auth?.user.email}
                                </div>
                            </div>
                        ) : (
                            <>
                                <ResponsiveNavLink href={route("login")}>
                                    Login
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route("register")}>
                                    Register
                                </ResponsiveNavLink>
                            </>
                        )}

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="shadow mt-16">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="py-4">{children}</main>
            <footer className="p-10 bg-base-200 text-base-content">
                <div className="max-w-7xl mx-auto footer py-6 px-4 sm:px-6 lg:px-8">
                    <div>
                        <ApplicationLogo className="block h-10 w-auto fill-current" />
                        <p>
                            Orbit Trust Corps.
                            <br />
                            Percetakan & Digital Printing
                        </p>
                    </div>
                    <div>
                        <span className="footer-title">Services</span>
                        <a className="link link-hover">Branding</a>
                        <a className="link link-hover">Design</a>
                        <a className="link link-hover">Marketing</a>
                        <a className="link link-hover">Advertisement</a>
                    </div>
                    <div>
                        <span className="footer-title">Company</span>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                        <a className="link link-hover">Press kit</a>
                    </div>
                    <div>
                        <span className="footer-title">Legal</span>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
