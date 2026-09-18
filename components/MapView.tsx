"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import type { MapPinPayload } from "@/lib/types";

export function MapView({ pins }: { pins: MapPinPayload[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    if (!token || !containerRef.current || pins.length === 0) {
      return;
    }

    let map: import("mapbox-gl").Map | undefined;
    let cancelled = false;

    void import("mapbox-gl").then((mapboxgl) => {
      if (cancelled || !containerRef.current) {
        return;
      }

      mapboxgl.default.accessToken = token;
      map = new mapboxgl.default.Map({
        container: containerRef.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [pins[0].coordinates.longitude, pins[0].coordinates.latitude],
        zoom: 2,
        attributionControl: true,
      });

      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), "top-right");
      map.addControl(new mapboxgl.default.ScaleControl({ unit: "metric" }));

      for (const pin of pins) {
        const popup = new mapboxgl.default.Popup({ offset: 16 }).setHTML(
          `<a href="/museums/${pin.slug}">${pin.name}</a><br/>${pin.city} · ${pin.artworkCount} works`,
        );

        new mapboxgl.default.Marker({ color: "#7a1f2b" })
          .setLngLat([pin.coordinates.longitude, pin.coordinates.latitude])
          .setPopup(popup)
          .addTo(map!);
      }
    });

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [pins, token]);

  if (!token) {
    return (
      <div
        className="rounded-lg border border-dashed border-gallery-line bg-gallery-paper p-6"
        role="region"
        aria-label="Map unavailable"
      >
        <p className="font-medium">Mapbox token not configured</p>
        <p className="mt-2 text-sm text-gallery-muted">
          Add <code>NEXT_PUBLIC_MAPBOX_TOKEN</code> to enable the interactive map. Museum
          locations are listed below.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-[480px] w-full overflow-hidden rounded-lg border border-gallery-line"
      role="region"
      aria-label="Museum locations map"
    />
  );
}
