import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { CV_URL } from "../lib/constants";

type NavKey = "main" | "papers" | "talks" | "cv" | "writing";

const NAV_ITEMS: { key: NavKey; label: string; href: string }[] = [
  { key: "main", label: "Main", href: "/" },
  { key: "papers", label: "Papers", href: "/papers" },
  { key: "talks", label: "Talks", href: "/talks" },
  { key: "cv", label: "CV", href: CV_URL },
  { key: "writing", label: "Writing", href: "/writing" },
];

const linkClass =
  "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy";

interface SiteHeaderProps {
  title: string;
  current: NavKey;
  /** Use "p" on pages that render their own <h1>, e.g. article pages. */
  titleAs?: "h1" | "p";
}

export default function SiteHeader({ title, current, titleAs: TitleTag = "h1" }: SiteHeaderProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <TitleTag className="text-xl md:text-2xl serif dark:text-gray-100 font-bold">{title}</TitleTag>
          <div className="flex items-center space-x-2 md:space-x-4">
            <nav className="hidden md:flex space-x-6 lg:space-x-8">
              {NAV_ITEMS.map((item) => (
                <Link key={item.key} href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <nav className="flex md:hidden space-x-3 text-sm">
              {NAV_ITEMS.filter((item) => item.key !== current).map((item) => (
                <Link key={item.key} href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
