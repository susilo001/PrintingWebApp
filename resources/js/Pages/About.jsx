import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
export default function About() {
    return (
        <AuthenticatedLayout header={<h1 className="font-bold text-2xl leading-tight">About Us</h1>}>
            <Head title="About Us" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col justify-center items-center">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Orbit Trust Corp.</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
                <div className="mb-8">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">Our Mission</h3>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>

                    <h3 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">Our Vision</h3>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}