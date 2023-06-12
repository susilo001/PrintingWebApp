import { Transition } from "@headlessui/react";
import { XCircleIcon, CheckCircleIcon, InformationCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

export default function Alert({ status, message }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (status) {
            setIsOpen(true);
        }
        const timer = setTimeout(() => {
            setIsOpen(false);
        }, 5000);
        return () => clearTimeout(timer);

    }, [status]);

    const statusClasses = {
        success: 'alert-success',
        error: 'alert-error',
        warning: 'alert-warning',
        info: 'alert-info',
    };

    const statusIcons = {
        success: <CheckCircleIcon className="h-6 w-6" />,
        error: <XCircleIcon className="h-6 w-6" />,
        warning: <ExclamationTriangleIcon className="h-6 w-6" />,
        info: <InformationCircleIcon className="h-6 w-6" />,
    };

    const closeAlert = () => {
        setIsOpen(false);
    };

    return (
        <>
            {isOpen && (
                <Transition show={true} appear={true} enter="transition ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8 space-y-2 w-full">
                        <div className={`alert flex justify-between w-full ${statusClasses[status]}`}>
                            <div className="flex space-x-4">
                                {statusIcons[status]}
                                <p>{message}</p>
                            </div>
                            <button onClick={closeAlert} className="btn btn-circle btn-sm btn-ghost">
                                <XCircleIcon className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </Transition>
            )}
        </>
    );
}