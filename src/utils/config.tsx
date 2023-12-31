const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === "production";

const appConfig = {
  name: "Tiny Wheels",
  logo: "/assets/icons/logo-dark.png",
  logoLight: "/assets/icons/logo-light.png",
  apiBaseUrl: isProduction
    ? "https://smiling-clam-jersey.cyclic.cloud"
    : "http://localhost:8000",
  websiteUrl: isProduction
    ? "https://tinywheels.vercel.app"
    : "http://localhost:3000",
  fallbackImage: "/assets/images/placeholder.jpg",
};

const cloudinaryConfig = {
  baseDeliveryUrl: "https://res.cloudinary.com/tinywheels/image/upload",
};

const defaultSEO = {
  defaultTitle: appConfig.name,
  titleTemplate: "%s | " + appConfig.name,
  description: "",
  canonical: "",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "",
    site_name: appConfig.name,
  },
};

export { appConfig, cloudinaryConfig, defaultSEO };
