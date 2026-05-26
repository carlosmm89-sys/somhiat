"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function PageTracker() {
  const pathname = usePathname();
  const lastPath = useRef("");

  useEffect(() => {
    // Skip admin pages
    if (pathname.startsWith("/admin")) return;
    // Avoid double-tracking same path
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;

    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: pathname,
        referrer: document.referrer || null,
      }),
    }).catch(() => {}); // Fire and forget
  }, [pathname]);

  return null;
}
