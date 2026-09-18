import type { BadgePayload } from "@/lib/types";

export function BadgeList({ badges }: { badges: BadgePayload[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-3" aria-label="Badges">
      {badges.map((badge) => (
        <li
          key={badge.slug}
          className={`rounded-lg border p-4 ${
            badge.earned
              ? "border-gallery-gold bg-gallery-paper"
              : "border-gallery-line bg-transparent opacity-70"
          }`}
        >
          <p className="font-medium">{badge.name}</p>
          <p className="text-sm text-gallery-muted">{badge.description}</p>
          <p className="mt-2 text-xs uppercase tracking-wide">
            {badge.earned ? "Earned" : `Requires ${badge.threshold} verified visits`}
          </p>
        </li>
      ))}
    </ul>
  );
}
