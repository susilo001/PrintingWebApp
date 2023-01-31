import Input from "@/Components/Input";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: "",
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route("password.confirm"));
  };

  return (
    <GuestLayout>
      <Head title="Confirm Password" />

      <p className="mb-4 text-sm">
        This is a secure area of the application. Please confirm your password
        before continuing.
      </p>

      <form onSubmit={submit}>
        <div className="mt-4">
          <Input
            id="password"
            label="Password"
            type="password"
            value={data.password}
            name="password"
            handleChange={onHandleChange}
            className="input-bordered"
            errors={errors.password}
          />
        </div>

        <div className="mt-4 flex items-center justify-end">
          <button
            className="btn-outline btn-ghost btn ml-4"
            disabled={processing}
          >
            Confirm
          </button>
        </div>
      </form>
    </GuestLayout>
  );
}
