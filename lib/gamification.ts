import { BADGE_DEFINITIONS } from "@/lib/catalog";
import type { BadgePayload, CheckInPayload, GamificationProfile, LeaderboardEntry } from "@/lib/types";

export interface StoredVisitor {
  userId: string;
  handle: string;
  displayName: string;
  checkIns: CheckInPayload[];
}

const visitors = new Map<string, StoredVisitor>();

function demoVisitor(): StoredVisitor {
  return {
    userId: process.env.DEMO_USER_ID ?? "demo-visitor",
    handle: "gallery-guest",
    displayName: "Gallery Guest",
    checkIns: [],
  };
}

export function getVisitor(userId?: string): StoredVisitor {
  const id = userId ?? process.env.DEMO_USER_ID ?? "demo-visitor";
  const existing = visitors.get(id);
  if (existing) {
    return existing;
  }
  const created = { ...demoVisitor(), userId: id };
  visitors.set(id, created);
  return created;
}

export function recordCheckIn(userId: string, checkIn: CheckInPayload): StoredVisitor {
  const visitor = getVisitor(userId);
  visitor.checkIns = [checkIn, ...visitor.checkIns];
  visitors.set(userId, visitor);
  return visitor;
}

export function badgesFor(checkIns: CheckInPayload[]): BadgePayload[] {
  const verifiedCount = checkIns.filter((item) => item.verified).length;
  return BADGE_DEFINITIONS.map((badge) => ({
    ...badge,
    earned: verifiedCount >= badge.threshold,
  }));
}

export function profileFor(visitor: StoredVisitor): GamificationProfile {
  const verified = visitor.checkIns.filter((item) => item.verified);
  return {
    userId: visitor.userId,
    handle: visitor.handle,
    displayName: visitor.displayName,
    totalPoints: verified.reduce((sum, item) => sum + item.pointsAwarded, 0),
    verifiedCheckIns: verified.length,
    badges: badgesFor(visitor.checkIns),
  };
}

export function leaderboard(): LeaderboardEntry[] {
  const entries = Array.from(visitors.values()).map((visitor) => profileFor(visitor));
  if (entries.length === 0) {
    entries.push(profileFor(getVisitor()));
  }

  return entries
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .map((entry, index) => ({
      rank: index + 1,
      userId: entry.userId,
      handle: entry.handle,
      displayName: entry.displayName,
      totalPoints: entry.totalPoints,
      verifiedCheckIns: entry.verifiedCheckIns,
    }));
}
