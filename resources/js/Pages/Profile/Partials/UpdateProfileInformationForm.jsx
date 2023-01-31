import Input from "@/Components/Input";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className,
}) {
  const user = usePage().props.auth.user;

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: user.name,
      email: user.email,
    });

  const submit = (e) => {
    e.preventDefault();

    patch(route("profile.update"));
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium">Profile Information</h2>

        <p className="mt-1 text-sm">
          Update your account's profile information and email address.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6">
        <div>
          <Input
            id="name"
            label="Name"
            value={data.name}
            handleChange={(e) => setData("name", e.target.value)}
            required
            isFocused
            autoComplete="name"
            className="input-bordered"
            errors={errors.name}
          />
        </div>

        <div>
          <Input
            label="Email"
            id="email"
            type="email"
            value={data.email}
            handleChange={(e) => setData("email", e.target.value)}
            required
            autoComplete="email"
            className="input-bordered"
            errors={errors.email}
          />
        </div>

        {mustVerifyEmail && user.email_verified_at === null && (
          <div>
            <p className="mt-2 text-sm">
              Your email address is unverified.
              <Link
                href={route("verification.send")}
                method="post"
                as="button"
                className="btn-link btn text-sm"
              >
                Click here to re-send the verification email.
              </Link>
            </p>

            {status === "verification-link-sent" && (
              <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                A new verification link has been sent to your email address.
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-4">
          <button className="btn-outline btn-ghost btn" disabled={processing}>
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
