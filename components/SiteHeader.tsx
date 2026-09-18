import Link from "next/link";

const links = [
  { href: "/", label: "Search" },
  { href: "/map", label: "Map" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/profile", label: "Profile" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-gallery-line bg-gallery-paper">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="font-serif text-xl tracking-tight" aria-label="Art Tracker home">
          Art Tracker
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center gap-4 text-sm font-medium">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gallery-muted underline-offset-4 hover:text-gallery-ink hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
