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
          With our easy-to-use online ordering system, you can easily place your order for either offset or digital printing.
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
      "Pilihan cetak offset kami menawarkan cetakan berkualitas tinggi dengan warna yang cerah dan beragam opsi kertas dan penyelesaian yang dapat dipilih. Dengan pilihan cetak offset kami, Anda dapat mencetak jumlah material dalam jumlah besar dengan harga terjangkau.",
    icon: GlobeAltIcon,
  },
  {
    name: "Digital Printing",
    description:
      "Dengan pilihan cetak digital kami, Anda dapat mencetak jumlah material dalam jumlah kecil dengan waktu pengerjaan yang cepat dan tanpa persyaratan pesanan minimum. Cetakan digital juga menawarkan fleksibilitas untuk mencetak data variabel, sehingga Anda dapat menyesuaikan material Anda dengan informasi yang individual.",
    icon: ScaleIcon,
  },
  {
    name: "Pemesanan Online yang Mudah",
    description:
      "Sistem pemesanan online kami dirancang untuk membuat pemesanan material cetak Anda menjadi sederhana dan nyaman. Hanya dengan beberapa klik, Anda dapat memilih pilihan cetak, jenis kertas, opsi penyelesaian, dan mengunggah desain Anda. Anda juga dapat dengan mudah melacak status pesanan Anda dan menerima pemberitahuan saat pesanan siap untuk diambil atau dikirim.",
    icon: BoltIcon,
  },
  {
    name: "Dukungan Pelanggan yang Luar Biasa",
    description:
      "Tim ahli cetak kami berdedikasi untuk menyediakan layanan cetak berkualitas tinggi dan dukungan pelanggan yang luar biasa. Apakah Anda memiliki pertanyaan tentang pilihan cetak yang harus dipilih, membutuhkan bantuan dalam persiapan desain, atau memiliki pertanyaan lainnya, tim kami siap membantu.",
    icon: DevicePhoneMobileIcon,
  },
];
