import NavLinks from "@components/NavLinks";
import Link from "next/link";

// import { Button } from "@/components/Button";
// import { TextField } from "@/components/Fields";
// import { Logomark } from "@/components/Logo";
// import { NavLinks } from "@/components/NavLinks";
// import qrCode from "@/images/qr-code.svg";

function QrCodeBorder(props: any) {
  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" {...props}>
      <path
        d="M1 17V9a8 8 0 0 1 8-8h8M95 17V9a8 8 0 0 0-8-8h-8M1 79v8a8 8 0 0 0 8 8h8M95 79v8a8 8 0 0 1-8 8h-8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const Footer = () => {
  return (
    <footer className="border-t border-gray-200">
      <div className="global-container">
        <div className="flex flex-col items-start justify-between pt-16 pb-6 gap-y-12 lg:flex-row lg:items-center lg:py-16">
          <div>
            <div className="flex items-center text-gray-800">
              {/* <Logomark className="flex-none w-10 h-10 fill-cyan-500" /> */}
              <div className="ml-4">
                <p className="text-base font-semibold">Pocket</p>
                <p className="mt-1 text-sm">Invest at the perfect time.</p>
              </div>
            </div>
            <nav className="flex gap-8 mt-11">
              <NavLinks />
            </nav>
          </div>
          <div className="relative flex items-center self-stretch p-4 -mx-4 transition-colors group hover:bg-gray-100 sm:self-auto sm:rounded-2xl lg:mx-0 lg:self-auto lg:p-6">
            <div className="relative flex items-center justify-center flex-none w-24 h-24">
              <QrCodeBorder className="absolute inset-0 w-full h-full transition-colors stroke-gray-300 group-hover:stroke-cyan-500" />
              {/* <Image src={qrCode} alt="" unoptimized /> */}
            </div>
            <div className="ml-8 lg:w-64">
              <p className="text-base font-semibold text-gray-800">
                <Link href="#">
                  <span className="absolute inset-0 sm:rounded-2xl" />
                  Download the app
                </Link>
              </p>
              <p className="mt-1 text-sm text-gray-700">
                Scan the QR code to download the app from the App Store.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center pt-8 pb-12 border-t border-gray-200 md:flex-row-reverse md:justify-between md:pt-6">
          <form className="flex justify-center w-full md:w-auto">
            {/* <TextField
              type="email"
              aria-label="Email address"
              placeholder="Email address"
              autoComplete="email"
              required
              className="min-w-0 w-60 shrink"
            />
            <Button type="submit" color="cyan" className="flex-none ml-4">
              <span className="hidden lg:inline">Join our newsletter</span>
              <span className="lg:hidden">Join newsletter</span>
            </Button> */}
          </form>
          <p className="mt-6 text-sm text-gray-500 md:mt-0">
            &copy; Copyright {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
