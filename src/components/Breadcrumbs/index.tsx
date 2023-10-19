import { HomeIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

type BreadcrumbItem = { name: string; path: string };

interface BreadcrumbProps {
  data?: BreadcrumbItem[];
  separator?: string;
  CustomHomeIcon?: React.ReactElement;
  textColor?: string;
  iconColor?: string;
  showHomeLink?: boolean;
  onBreadcrumbClick?: (path: string) => void;
  breadcrumbStyle?: React.CSSProperties;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  data,
  separator = ">",
  CustomHomeIcon,
  textColor = "text-gray-600",
  iconColor = "hover:text-sky-600",
  showHomeLink = true,
  onBreadcrumbClick,
  breadcrumbStyle,
}) => {
  const router = useRouter();
  const { asPath } = router;

  const Icon = CustomHomeIcon || HomeIcon;

  const segments = asPath.split("/").filter((segment) => segment !== "");
  const breadcrumbs = segments.map((segment, index) => ({
    name: segment
      .replace(/[-_]/g, " ")
      .replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      ),
    path:
      index === segments.length - 1
        ? `/${segments.slice(0, index + 1).join("/")}`
        : "",
  }));

  return (
    <nav className="text-sm select-none" style={breadcrumbStyle}>
      <ul className="flex items-center space-x-2">
        {showHomeLink && (
          <Link href="/" className="flex items-center space-x-2">
            <Icon
              className={classNames(
                textColor,
                "w-4 h-4 duration-200 hover:text-sky-500"
              )}
            />
            <span className={textColor}>{separator}</span>
          </Link>
        )}
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.path} className="space-x-2">
            {breadcrumb.path ? (
              <Link
                href={breadcrumb.path}
                className={iconColor}
                onClick={() =>
                  onBreadcrumbClick && onBreadcrumbClick(breadcrumb.path)
                }
              >
                <span
                  className={`${textColor} hover:text-sky-500 duration-200`}
                >
                  {breadcrumb.name}
                </span>
              </Link>
            ) : (
              <span className={textColor}>{breadcrumb.name}</span>
            )}
            {index < breadcrumbs.length - 1 && (
              <span className={textColor}>{separator}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
