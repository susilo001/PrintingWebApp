import Input from "@/Components/Input";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import Button from "@/Components/Button";

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
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

    post(route("register"));
  };

  return (
    <GuestLayout>
      <Head title="Register" />

      <form onSubmit={submit}>
        <div>
          <Input
            id="name"
            label="Name"
            name="name"
            placeholder="e.g. John Doe"
            value={data.name}
            handleChange={onHandleChange}
            autoComplete="name"
            errors={errors.name}
            className="input-bordered"
          />
        </div>

        <div>
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="e.g. example@gmail.com"
            name="email"
            value={data.email}
            handleChange={onHandleChange}
            autoComplete="username"
            errors={errors.email}
            className="input-bordered"
          />
        </div>

        <div>
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            handleChange={onHandleChange}
            autoComplete="new-password"
            errors={errors.password}
            className="input-bordered"
          />
        </div>

        <div>
          <Input
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            value={data.password_confirmation}
            handleChange={onHandleChange}
            required
            className="input-bordered"
            label="Confirm Password"
            errors={errors.password_confirmation}
          />
        </div>
        <div className="mt-4">
          <Link href={route("login")} className="link-hover link">
            Already registered ? Click here to login
          </Link>
        </div>

        <div className="mt-4">
          <Button className="btn-primary btn-block" disabled={processing}>
            Register
          </Button>
        </div>
      </form>
    </GuestLayout>
  );
}
