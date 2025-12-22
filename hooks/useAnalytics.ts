"use client";

import { useEffect, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export function useAnalytics() {
  const sessionIdRef = useRef<string | null>(null);

  useEffect(() => {
    // Initialize session
    let storedId = localStorage.getItem("portfolio_session_id");
    if (!storedId) {
      storedId = uuidv4();
      localStorage.setItem("portfolio_session_id", storedId);
    }
    sessionIdRef.current = storedId;
  }, []);

  const trackEvent = useCallback(async (type: string, data: Record<string, unknown> = {}) => {
    if (!sessionIdRef.current) return;

    try {
      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: type,
          eventData: data,
          sessionId: sessionIdRef.current,
        }),
      });
    } catch (err) {
      console.error("Analytics tracking failed:", err);
    }
  }, []);

  return { trackEvent };
}
