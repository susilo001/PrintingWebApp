import Input from "@/Components/Input";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route("password.store"));
  };

  return (
    <GuestLayout>
      <Head title="Reset Password" />

      <form onSubmit={submit}>
        <div>
          <Input
            id="email"
            label="Email"
            type="email"
            name="email"
            value={data.email}
            className="input-bordered"
            autoComplete="username"
            handleChange={onHandleChange}
            errors={errors.email}
          />
        </div>

        <div className="mt-4">
          <Input
            id="password"
            label="Password"
            type="password"
            name="password"
            value={data.password}
            autoComplete="new-password"
            isFocused={true}
            handleChange={onHandleChange}
            errors={errors.password}
          />
        </div>

        <div className="mt-4">
          <Input
            id="password_confirmation"
            label="Confirm Password"
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            autoComplete="new-password"
            handleChange={onHandleChange}
            errors={errors.password_confirmation}
          />
        </div>

        <div className="mt-4 flex items-center justify-end">
          <button
            className="btn-outline btn-ghost btn ml-4"
            disabled={processing}
          >
            Reset Password
          </button>
        </div>
      </form>
    </GuestLayout>
  );
}
