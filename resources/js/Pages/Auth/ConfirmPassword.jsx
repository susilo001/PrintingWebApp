import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";

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

      <div className="mb-4 text-sm">
        This is a secure area of the application. Please confirm your password
        before continuing.
      </div>

      <form onSubmit={submit}>
        <div className="mt-4">
          <Input
            id="password"
            label="Password"
            type="password"
            value={data.password}
            name="password"
            isFocused={true}
            handleChange={onHandleChange}
            className="input-bordered"
            errors={errors.password}
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <button
            className="btn btn-ghost btn-outline ml-4"
            disabled={processing}
          >
            Confirm
          </button>
        </div>
      </form>
    </GuestLayout>
  );
}
