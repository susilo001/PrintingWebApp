import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/inertia-react";

export default function HomePage(props) {
    return (
        <GuestLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Home
                </h2>
            }
        >
            <Head title="Home" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Welcome to your Inertia app!
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
