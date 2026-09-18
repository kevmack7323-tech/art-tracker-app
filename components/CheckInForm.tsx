"use client";

import { FormEvent, useState } from "react";
import type { ArtworkPayload, CheckInPayload, PhotoVerificationResult } from "@/lib/types";

interface CheckInResponse {
  checkIn: CheckInPayload;
  verification: PhotoVerificationResult;
  error?: string;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read the photo."));
    reader.readAsDataURL(file);
  });
}

export function CheckInForm({ artwork }: { artwork: ArtworkPayload }) {
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus("Requesting your location…");

    const form = event.currentTarget;
    const photoInput = form.elements.namedItem("photo") as HTMLInputElement;
    const file = photoInput.files?.[0];

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocation is not available in this browser."));
          return;
        }
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 12_000,
        });
      });

      let photoBase64: string | undefined;
      if (file) {
        photoBase64 = await fileToBase64(file);
      }

      setStatus("Verifying check-in…");
      const response = await fetch("/api/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artworkId: artwork.id,
          userId: "demo-visitor",
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          photoBase64,
          photoMimeType: file?.type,
        }),
      });

      const data = (await response.json()) as CheckInResponse & { error?: string };
      if (!response.ok) {
        setStatus(data.error ?? "Check-in failed.");
        return;
      }

      if (data.checkIn.verified) {
        setStatus(
          `Verified. ${data.checkIn.pointsAwarded} points awarded. ${data.verification.reason}`,
        );
      } else {
        setStatus(`Recorded but not verified. ${data.verification.reason}`);
      }
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Check-in failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-lg border border-gallery-line bg-gallery-paper p-5">
      <fieldset disabled={busy} className="space-y-4">
        <legend className="font-serif text-2xl">Museum check-in</legend>
        <p className="text-sm text-gallery-muted">
          Check in near {artwork.museum.name}. A photo is verified with Gemini Vision when
          configured.
        </p>
        <div>
          <label htmlFor="photo" className="mb-1 block text-sm font-medium">
            Artwork photo
          </label>
          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            capture="environment"
            className="block w-full text-sm"
            aria-describedby="photo-help"
          />
          <p id="photo-help" className="mt-1 text-xs text-gallery-muted">
            Optional but required for points and badges.
          </p>
        </div>
        <button
          type="submit"
          className="rounded-md bg-gallery-burgundy px-5 py-3 font-medium text-white hover:bg-[#641823] disabled:opacity-60"
        >
          {busy ? "Checking in…" : "Check in here"}
        </button>
      </fieldset>
      <div role="status" aria-live="polite" className="text-sm">
        {status}
      </div>
    </form>
  );
}
