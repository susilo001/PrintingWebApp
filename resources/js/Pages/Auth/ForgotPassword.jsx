import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
  });

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route("password.email"));
  };

  return (
    <GuestLayout>
      <Head title="Forgot Password" />

      <div className="mb-4 text-sm">
        Forgot your password? No problem. Just let us know your email address
        and we will email you a password reset link that will allow you to
        choose a new one.
      </div>

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
          {status}
        </div>
      )}

      <form onSubmit={submit}>
        <Input
          id="password"
          type="email"
          name="email"
          value={data.email}
          className="input-bordered"
          isFocused={true}
          handleChange={onHandleChange}
          errors={errors.email}
        />

        <div className="flex items-center justify-end mt-4">
          <button className="btn btn-ghost ml-4" disabled={processing}>
            Email Password Reset Link
          </button>
        </div>
      </form>
    </GuestLayout>
  );
}
