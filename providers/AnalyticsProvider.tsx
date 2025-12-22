"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { trackEvent } = useAnalytics();

    // Track page views
    useEffect(() => {
        trackEvent("page_view", { url: pathname });
    }, [pathname, trackEvent]);

    // Track section engagement
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        trackEvent("section_view", { sectionId: entry.target.id });
                    }
                });
            },
            { threshold: 0.5 } // 50% of the section must be visible
        );

        // Observe all sections with IDs
        const sections = document.querySelectorAll("section[id]");
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, [trackEvent]);

    return <>{children}</>;
}
