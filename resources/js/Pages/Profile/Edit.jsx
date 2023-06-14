import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import CreateShippingAddress from "./Partials/CreateShippingAddress";

export default function Edit({ mustVerifyEmail, status }) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight">Profile</h2>
      }
    >
      <Head title="Profile" />

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
        <CreateShippingAddress className="max-w-7xl" />
      </div>

      <div className="border p-4 shadow sm:rounded-lg sm:p-8">
        <DeleteUserForm className="max-w-xl" />
      </div>
    </AuthenticatedLayout>
  );
}
