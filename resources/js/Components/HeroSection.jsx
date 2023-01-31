import { CheckIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";

export default function HeroSection() {
  return (
    <div className="container mx-auto flex flex-col space-y-6 px-6 py-10 lg:h-[32rem] lg:flex-row lg:items-center lg:py-16">
      <div className="w-full lg:w-1/2">
        <div className="lg:max-w-lg">
          <h1 className="text-3xl font-semibold tracking-wide lg:text-4xl">
            Print like a pro with our premium printing services.
          </h1>
          <p className="mt-4">
            From business cards to brochures, we've got you covered. With
            state-of-the-art equipment, experienced technicians and a wide range
            of paper and ink options, we guarantee your print job will exceed
            your expectations. Trust us for your next project and experience the
            difference in quality.
          </p>
          <div className="my-8 grid gap-6 sm:grid-cols-2">
            <div className="flex items-center">
              <CheckIcon className="h-5 w-6" />

              <span className="mx-3">Premium selection</span>
            </div>

            <div className="-px-3 flex items-center ">
              <CheckIcon className="h-5 w-6" />

              <span className="mx-3">Insurance</span>
            </div>

            <div className="-px-3 flex items-center">
              <CheckIcon className="h-5 w-6" />

              <span className="mx-3">All legal documents</span>
            </div>

            <div className="-px-3 flex  items-center ">
              <CheckIcon className="h-5 w-6" />

              <span className="mx-3">From US glasses dealers</span>
            </div>

            <div className="-px-3 flex  items-center ">
              <CheckIcon className="h-5 w-6" />

              <span className="mx-3">Payment Security</span>
            </div>

            <div className="-px-3 flex  items-center ">
              <CheckIcon className="h-5 w-6" />

              <span className="mx-3">Fast shipping (+ Express)</span>
            </div>
          </div>
          <Link
            href="/design"
            as="button"
            className="btn-primary btn text-base-100"
          >
            Try Design Tool
          </Link>
        </div>
      </div>

      <div className="flex h-96 w-full items-center justify-center lg:w-1/2">
        <img
          className="h-full w-full max-w-2xl rounded-md object-cover"
          src="../asset/hero-section.jpg"
          alt="Printing Services"
        />
      </div>
    </div>
  );
}
