import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import CreateShippingAddress from "./Partials/CreateShippingAddress";
import { Tab } from "@headlessui/react";
import { UserIcon, TruckIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Edit({ mustVerifyEmail, status }) {

  return (
    <AuthenticatedLayout
      header={
        <div>
          <h1 className="text-lg font-bold lg:text-2xl">Profile</h1>
          <p className="text-xs text-gray-500 lg:text-sm">
            Update your profile information
          </p>
        </div>
      }
    >
      <Head title="Profile" />

      <Tab.Group>
        <Tab.List className="p-4 border sm:rounded-lg tabs">
          <Tab
            className={
              ({ selected }) => classNames('tab tab-bordered', selected && 'tab-active')
            }>
            <div className="flex items-center gap-2">
              <UserIcon className="w-5 h-5" />
              Profile Information
            </div>
          </Tab>
          <Tab
            className={
              ({ selected }) => classNames('tab tab-bordered', selected && 'tab-active')
            }>
            <div className="flex items-center gap-2">
              <TruckIcon className="w-5 h-5" />
              Shipping Address
            </div>
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className='flex flex-col space-y-8'>
            <div className="border p-4 shadow sm:rounded-lg sm:p-8">
              <UpdateProfileInformationForm
                mustVerifyEmail={mustVerifyEmail}
                status={status}
                className="max-w-7xl"
              />
            </div>
            <div className="border p-4 shadow sm:rounded-lg sm:p-8">
              <UpdatePasswordForm className="max-w-xl" />
            </div>
            <div className="border p-4 shadow sm:rounded-lg sm:p-8">
              <DeleteUserForm className="max-w-xl" />
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="border p-4 shadow sm:rounded-lg sm:p-8">
              <CreateShippingAddress className="max-w-7xl" />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

    </AuthenticatedLayout>
  );
}
