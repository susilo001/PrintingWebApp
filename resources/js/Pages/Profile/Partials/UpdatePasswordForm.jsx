import { useRef } from "react";
import { useForm } from "@inertiajs/inertia-react";
import { Transition } from "@headlessui/react";
import Input from "@/Components/Input";

export default function UpdatePasswordForm({ className }) {
  const passwordInput = useRef();
  const currentPasswordInput = useRef();

  const { data, setData, errors, put, reset, processing, recentlySuccessful } =
    useForm({
      current_password: "",
      password: "",
      password_confirmation: "",
    });

  const updatePassword = (e) => {
    e.preventDefault();

    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: () => {
        if (errors.password) {
          reset("password", "password_confirmation");
          passwordInput.current.focus();
        }

        if (errors.current_password) {
          reset("current_password");
          currentPasswordInput.current.focus();
        }
      },
    });
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium">Update Password</h2>

        <p className="mt-1 text-sm">
          Ensure your account is using a long, random password to stay secure.
        </p>
      </header>

      <form onSubmit={updatePassword} className="mt-6">
        <div>
          <Input
            id="current_password"
            label="Current Password"
            ref={currentPasswordInput}
            value={data.current_password}
            handleChange={(e) => setData("current_password", e.target.value)}
            type="password"
            autoComplete="current-password"
            className="input-bordered"
            errors={errors.current_password}
          />
        </div>

        <div>
          <Input
            label="New Password"
            ref={passwordInput}
            value={data.password}
            handleChange={(e) => setData("password", e.target.value)}
            type="password"
            autoComplete="new-password"
            className="input-bordered"
            errors={errors.password}
          />
        </div>

        <div>
          <Input
            label="Confirm Password"
            value={data.password_confirmation}
            handleChange={(e) =>
              setData("password_confirmation", e.target.value)
            }
            type="password"
            autoComplete="new-password"
            className="input-bordered"
            errors={errors.password_confirmation}
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="btn btn-ghost btn-outline" disabled={processing}>
            Save
          </button>

          <Transition
            show={recentlySuccessful}
            enterFrom="opacity-0"
            leaveTo="opacity-0"
            className="transition ease-in-out"
          >
            <p className="text-sm">Saved.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
