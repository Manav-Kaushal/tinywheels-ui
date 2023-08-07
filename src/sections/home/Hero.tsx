import { useId } from "react";

// import { AppDemo } from "@/components/AppDemo";
// import { AppStoreLink } from "@/components/AppStoreLink";
// import { Button } from "@/components/Button";
// import { Container } from "@/components/Container";
// import { PhoneFrame } from "@/components/PhoneFrame";
// import logoBbc from "@/images/logos/bbc.svg";
// import logoCbs from "@/images/logos/cbs.svg";
// import logoCnn from "@/images/logos/cnn.svg";
// import logoFastCompany from "@/images/logos/fast-company.svg";
// import logoForbes from "@/images/logos/forbes.svg";
// import logoHuffpost from "@/images/logos/huffpost.svg";
// import logoTechcrunch from "@/images/logos/techcrunch.svg";
// import logoWired from "@/images/logos/wired.svg";

function BackgroundIllustration(props: any) {
  let id = useId();

  return (
    <div {...props}>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full animate-spin-slow"
      >
        <path
          d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M513 1025C230.23 1025 1 795.77 1 513"
          stroke={`url(#${id}-gradient-1)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-1`}
            x1="1"
            y1="513"
            x2="1"
            y2="1025"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#06b6d4" />
            <stop offset="1" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full animate-spin-reverse-slower"
      >
        <path
          d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M913 513c0 220.914-179.086 400-400 400"
          stroke={`url(#${id}-gradient-2)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-2`}
            x1="913"
            y1="513"
            x2="913"
            y2="913"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#06b6d4" />
            <stop offset="1" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function Hero() {
  return (
    <div className="py-20 overflow-hidden sm:py-32 lg:pb-32 xl:pb-36">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
        <div className="relative z-10 max-w-2xl mx-auto lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
          <h1 className="text-4xl font-medium tracking-tight text-gray-900">
            Discover the World of TinyWheels
          </h1>
          <h2>Collectible Miniature Car Models for Enthusiasts</h2>
          <p className="mt-6 text-lg text-gray-600">
            Welcome to TinyWheels, your ultimate destination for high-quality
            miniature car models! Explore our vast collection of meticulously
            crafted replicas, perfect for passionate car enthusiasts and
            collectors alike.
          </p>
          <div className="flex flex-wrap mt-8 gap-x-6 gap-y-4">
            {/* <AppStoreLink /> */}
            {/* <Button
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                variant="outline"
              >
                <PlayIcon className="flex-none w-6 h-6" />
                <span className="ml-2.5">Watch the video</span>
              </Button> */}
            <button>test</button>
          </div>
        </div>
        <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
          <BackgroundIllustration className="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0" />
          {/* <div className="-mx-4 h-[448px] px-9 [mask-image:linear-gradient(to_bottom,white_60%,transparent)] sm:mx-0 lg:absolute lg:-inset-x-10 lg:-bottom-20 lg:-top-10 lg:h-auto lg:px-0 lg:pt-10 xl:-bottom-32">
              <PhoneFrame className="mx-auto max-w-[366px]" priority>
                <AppDemo />
              </PhoneFrame>
            </div> */}
        </div>
        <div className="relative -mt-4 lg:col-span-7 lg:mt-0 xl:col-span-6">
          <p className="text-sm font-semibold text-center text-gray-900 lg:text-left">
            As featured in
          </p>
          {/* <ul
                role="list"
                className="flex flex-wrap justify-center max-w-xl mx-auto mt-8 gap-x-10 gap-y-8 lg:mx-0 lg:justify-start"
              >
                {[
                  ["Forbes", logoForbes],
                  ["TechCrunch", logoTechcrunch],
                  ["Wired", logoWired],
                  ["CNN", logoCnn, "hidden xl:block"],
                  ["BBC", logoBbc],
                  ["CBS", logoCbs],
                  ["Fast Company", logoFastCompany],
                  ["HuffPost", logoHuffpost, "hidden xl:block"],
                ].map(([name, logo, className]) => (
                  <li key={name} className={clsx("flex", className)}>
                    <Image src={logo} alt={name} className="h-8" unoptimized />
                  </li>
                ))}
              </ul> */}
        </div>
      </div>
    </div>
  );
}
