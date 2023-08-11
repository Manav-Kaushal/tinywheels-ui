import Button from "@components/Button";
import Image from "@components/Image";
import logoAudi from "@public/assets/brand-logos/audi.svg";
import logoBmw from "@public/assets/brand-logos/bmw.svg";
import logoFord from "@public/assets/brand-logos/ford.svg";
import logoHonda from "@public/assets/brand-logos/honda.svg";
import logoBenz from "@public/assets/brand-logos/mercedes-benz.svg";
import logoPorsche from "@public/assets/brand-logos/porsche.svg";
import logoToyota from "@public/assets/brand-logos/toyota.svg";
import logoVW from "@public/assets/brand-logos/volkswagen.svg";
import { appConfig } from "@utils/config";
import classNames from "classnames";
import { motion } from "framer-motion";
import { useId } from "react";

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

const Hero = () => {
  return (
    <div className="py-20 overflow-hidden sm:py-20 lg:pb-24 xl:pb-36 global-container">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
        <motion.div className="relative z-10 max-w-2xl mx-auto text-gray-800 lg:col-span-7 lg:max-w-none xl:col-span-6">
          <h2 className="text-2xl font-medium tracking-tight">
            Discover the World of {appConfig.name}
          </h2>
          <h1 className="mt-2 text-5xl font-semibold leading-tight">
            Miniature <span className="text-primary-600">Car Collectibles</span>{" "}
            Tailored For Enthusiasts
          </h1>
          <p className="max-w-2xl mt-4 text-lg text-gray-600">
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
            <Button variant="primary" label="Shop Your Collection Today" />
          </div>
        </motion.div>
        <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
          <BackgroundIllustration className="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0" />
          <div className="h-[400px] px-8 sm:mx-0 lg:absolute lg:-inset-x-20 lg:-bottom-20 lg:-top-40 lg:h-auto lg:px-0 lg:pt-10 xl:-bottom-30">
            {/* <ModelViewer modelPath="/assets/glbs/toyota_supra_a80_1993.glb" /> */}
            <Image
              src="/v1691790628/static/hero_img_ws28bv.png"
              alt="hero-background"
              width={800}
              height={800}
            />
          </div>
        </div>
        <div className="relative -mt-4 lg:col-span-7 lg:-mt-4 xl:col-span-6">
          <p className="text-sm font-semibold text-center text-gray-800 lg:text-left">
            Featured Brands
          </p>
          <ul
            role="list"
            className="flex flex-wrap justify-center max-w-xl mx-auto mt-8 gap-x-6 gap-y-8 lg:mx-0 lg:justify-start"
          >
            {[
              ["BMW", logoBmw],
              ["Mercedes-Benz", logoBenz],
              ["Ford", logoFord],
              ["Toyota", logoToyota, "hidden xl:block"],
              ["Volkswagen", logoVW],
              ["Audi", logoAudi],
              ["Porsche", logoPorsche],
              ["Honda", logoHonda, "hidden xl:block"],
            ].map(([name, logo, className]) => (
              <li key={name} className={classNames("flex", className)}>
                <Image
                  src={logo}
                  alt={name}
                  className="h-12 duration-200 hover:scale-125 grayscale hover:grayscale-0"
                  raw
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hero;
