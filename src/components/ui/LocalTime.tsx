"use client";

import { useSyncExternalStore } from "react";
import { profile } from "@/data/profile";

const fmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: profile.timeZone,
});

const subscribe = (cb: () => void) => {
  const id = window.setInterval(cb, 15_000);
  return () => window.clearInterval(id);
};

/** Live time in Kampala. Renders nothing on the server, so there's no hydration mismatch. */
export function LocalTime({ className = "" }: { className?: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () => fmt.format(new Date()),
    () => "",
  );
  return (
    <span className={className}>
      <time suppressHydrationWarning>{time || "--:--"}</time> {profile.timeZoneLabel}
    </span>
  );
}
