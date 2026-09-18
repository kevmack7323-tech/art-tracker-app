import type { Metadata } from "next";
import { getVisitor, leaderboard } from "@/lib/gamification";

export const metadata: Metadata = {
  title: "Leaderboard",
};

export const dynamic = "force-dynamic";

export default function LeaderboardPage() {
  getVisitor();
  const rows = leaderboard();

  return (
    <main id="main-content" className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-serif text-4xl">Leaderboard</h1>
      <p className="mt-3 text-gallery-muted">Ranked by verified check-in points.</p>
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full border-collapse text-left">
          <caption className="sr-only">Visitor ranking by points</caption>
          <thead>
            <tr className="border-b border-gallery-line">
              <th scope="col" className="py-3 pr-4">
                Rank
              </th>
              <th scope="col" className="py-3 pr-4">
                Visitor
              </th>
              <th scope="col" className="py-3 pr-4">
                Points
              </th>
              <th scope="col" className="py-3">
                Verified visits
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.userId} className="border-b border-gallery-line">
                <td className="py-3 pr-4">{row.rank}</td>
                <td className="py-3 pr-4">
                  {row.displayName}{" "}
                  <span className="text-gallery-muted">@{row.handle}</span>
                </td>
                <td className="py-3 pr-4">{row.totalPoints}</td>
                <td className="py-3">{row.verifiedCheckIns}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
