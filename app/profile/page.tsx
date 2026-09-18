import type { Metadata } from "next";
import { BadgeList } from "@/components/BadgeList";
import { getVisitor, profileFor } from "@/lib/gamification";

export const metadata: Metadata = {
  title: "Profile",
};

export const dynamic = "force-dynamic";

export default function ProfilePage() {
  const profile = profileFor(getVisitor());

  return (
    <main id="main-content" className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-serif text-4xl">{profile.displayName}</h1>
      <p className="mt-2 text-gallery-muted">@{profile.handle}</p>
      <dl className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-gallery-line bg-gallery-paper p-4">
          <dt className="text-sm text-gallery-muted">Points</dt>
          <dd className="font-serif text-3xl">{profile.totalPoints}</dd>
        </div>
        <div className="rounded-lg border border-gallery-line bg-gallery-paper p-4">
          <dt className="text-sm text-gallery-muted">Verified check-ins</dt>
          <dd className="font-serif text-3xl">{profile.verifiedCheckIns}</dd>
        </div>
      </dl>
      <section className="mt-10" aria-labelledby="badges-heading">
        <h2 id="badges-heading" className="mb-4 font-serif text-2xl">
          Badges
        </h2>
        <BadgeList badges={profile.badges} />
      </section>
    </main>
  );
}
