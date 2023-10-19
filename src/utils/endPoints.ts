export const getLoginUrl = () => {
  return "/auth/login";
};

export const getProductEndpoints = ({
  slug,
  admin,
}: {
  slug?: string;
  admin?: boolean;
}) => {
  if (admin) {
    return "/products?admin=true";
  }
  if (slug) {
    return `/products/${slug}`;
  }
  return "/products";
};
