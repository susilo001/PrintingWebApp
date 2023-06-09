import Input from "@/Components/Input";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import Button from "@/Components/Button";

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className,
}) {
  const user = usePage().props.auth.user;

  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: user.name,
    email: user.email,
    phone_number: user.phone_number,
    avatar: user.avatar,
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
          Update your account profile information and email address.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 grid sm:grid-cols-2 gap-4">
        <div>
          <div className="grid grid-cols-2 gap-4">
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
          <Input
            label="Phone Number"
            id="phone_number"
            type="text"
            value={data.phone_number}
            handleChange={(e) => setData("phone_number", e.target.value)}
            required
            autoComplete="phone_number"
            className="input-bordered"
            errors={errors.phone_number}
          />

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
        </div>
        <div className="flex items-center justify-center border-2 rounded-md">
          <img src={data.avatar} alt="avatar" className="rounded-full w-28 h-28 object-cover" />
        </div>
        <div className="flex items-center gap-4">
          <Button className="btn-primary text-white btn-sm" disabled={processing}>
            Save
          </Button>

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
