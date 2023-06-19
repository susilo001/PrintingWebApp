import Input from "@/Components/Input";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import Button from "@/Components/Button";

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

      <p className="mb-4 text-sm">
        Forgot your password? No problem. Just let us know your email address
        and we will email you a password reset link that will allow you to
        choose a new one.
      </p>

      {status && (
        <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
          {status}
        </div>
      )}

      <form onSubmit={submit}>
        <Input
          id="password"
          type="email"
          name="email"
          label="Email"
          value={data.email}
          className="input-bordered"
          handleChange={onHandleChange}
          errors={errors.email}
        />

        <div className="mt-4 flex items-center justify-end">
          <Button className="btn-ghost normal-case" disabled={processing}>
            Reset Password
          </Button>
        </div>
      </form>
    </GuestLayout>
  );
}
