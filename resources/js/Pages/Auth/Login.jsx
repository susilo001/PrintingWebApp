import Checkbox from "@/Components/Checkbox";
import Input from "@/Components/Input";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import Button from "@/Components/Button";

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
        <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
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

        <div className="mt-4 block">
          <label className="flex items-center">
            <Checkbox
              name="remember"
              value={data.remember}
              handleChange={onHandleChange}
            />
            <span className="ml-2 text-sm ">Remember me</span>
          </label>
        </div>

        <div className="mt-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          {canResetPassword && (
            <Link href={route("password.request")} className="link-hover link">
              Forgot your password?
            </Link>
          )}
          <Link href={route("register")} className="link-hover link">
            Not registered yet ?
          </Link>
        </div>

        <div className="mt-4 flex justify-center">
          <Button className="btn-primary btn-block" disabled={processing}>
            Login
          </Button>
        </div>
      </form>
    </GuestLayout>
  );
}
