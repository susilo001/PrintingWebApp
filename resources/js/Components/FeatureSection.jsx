import {
  BoltIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  ScaleIcon,
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

      <div className="mt-20 max-w-lg sm:mx-auto md:max-w-none">
        <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-white sm:shrink-0">
                <feature.icon className="h-8 w-8" aria-hidden="true" />
              </div>
              <div className="sm:min-w-0 sm:flex-1">
                <p className="text-lg font-semibold leading-8">
                  {feature.name}
                </p>
                <p className="mt-2 text-base leading-7">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    name: "Offset Printing",
    description:
      "Our offset printing option offers high-quality printing with vibrant colors and a variety of paper and finishing options to choose from. With our offset printing option, you can print large quantities of materials at an affordable price point.",
    icon: GlobeAltIcon,
  },
  {
    name: "Digital Printing",
    description:
      "With our digital printing option, you can print smaller quantities of materials with quick turnaround times and no minimum order requirements. Digital printing also offers the flexibility to print variable data, so you can customize your materials with individualized information.",
    icon: ScaleIcon,
  },
  {
    name: "Easy Online Ordering",
    description:
      "Our online ordering system is designed to make ordering your printing materials simple and convenient. With just a few clicks, you can select your printing option, paper type, finishing options, and upload your artwork. You can also easily track the status of your order and receive notifications when it's ready for pickup or delivery.",
    icon: BoltIcon,
  },
  {
    name: "Offset and Digital Printing Experts",
    description:
      "Our team of printing experts is dedicated to providing high-quality printing services and exceptional customer support. Whether you have questions about which printing option to choose, need help with artwork preparation, or have any other questions, our team is here to help.",
    icon: DevicePhoneMobileIcon,
  },
];
