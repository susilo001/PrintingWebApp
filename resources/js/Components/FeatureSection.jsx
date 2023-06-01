import {
  CheckIcon,  PencilSquareIcon,  ClockIcon, HeartIcon
} from "@heroicons/react/24/outline";

export default function FeatureSection() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="sm:text-center">
        <h2 className="text-lg font-semibold leading-8 text-secondary">
          Benefits
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight  sm:text-4xl">
          Offset and Digital Printing Ordering
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 ">
          With our easy-to-use online ordering system, you can easily place your
          order for either offset or digital printing.
        </p>
      </div>

      <div className="mt-10 max-w-lg sm:mx-auto md:max-w-none">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="relative flex gap-6 border items-center p-4 rounded-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-white sm:shrink-0">
                <feature.icon className="h-8 w-8" aria-hidden="true" />
              </div>
              <p className="font-semibold leading-8">{feature.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    name: "High-Quality Printing",
    icon: CheckIcon ,
  },
  
  {
    name: "Custom Design Services",
    icon: PencilSquareIcon,
  },
  
  {
    name: "24/7 Online Ordering",
    icon: ClockIcon,
  },
  {
    name: "Satisfaction Guarantee",
    icon: HeartIcon,
  },
];

