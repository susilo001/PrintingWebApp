import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: "",
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    );
  };

  const submit = (e) => {
    e.preventDefault();

    post(route("login"));
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600">{status}</div>
      )}

      <form onSubmit={submit}>
        <div>
          <Input
            id="email"
            label="Email"
            placeholder="example@example.com"
            type="email"
            name="email"
            value={data.email}
            handleChange={onHandleChange}
            className="input-bordered"
            errors={errors.email}
            autoComplete="username"
          />
        </div>

        <div>
          <Input
            id="password"
            label="Password"
            placeholder="Your password"
            type="password"
            name="password"
            value={data.password}
            handleChange={onHandleChange}
            className="input-bordered"
            errors={errors.password}
            autoComplete="current-password"
          />
        </div>

        <div className="block mt-4">
          <label className="flex items-center">
            <Checkbox
              name="remember"
              value={data.remember}
              handleChange={onHandleChange}
            />
            <span className="ml-2 text-sm ">Remember me</span>
          </label>
        </div>

        <div className="flex items-center justify-end mt-4">
          {canResetPassword && (
            <Link href={route("password.request")} className="link link-hover">
              Forgot your password?
            </Link>
          )}

          <button
            className="btn btn-sm btn-ghost btn-outline ml-4"
            disabled={processing}
          >
            Login
          </button>
        </div>
      </form>
    </GuestLayout>
  );
}
