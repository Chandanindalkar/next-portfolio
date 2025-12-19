"use client";

import { useGSAP } from "@/components/hooks/useGSAP";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useRef } from "react";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Only activate on desktop (rough check, can be refined with media queries in CSS)
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouch) return;

        const cursor = cursorRef.current;
        const follower = followerRef.current;

        // Initial hide
        gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });
        gsap.set(follower, { xPercent: -50, yPercent: -50, opacity: 0 });

        const onMouseMove = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                opacity: 1,
                overwrite: 'auto'
            });
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: "power2.out",
                opacity: 0.5,
                overwrite: 'auto'
            });
        };

        const onMouseEnter = () => {
            gsap.to([cursor, follower], { opacity: 1 });
        }

        const onMouseLeave = () => {
            gsap.to([cursor, follower], { opacity: 0 });
        }

        window.addEventListener("mousemove", onMouseMove);
        document.body.addEventListener("mouseenter", onMouseEnter);
        document.body.addEventListener("mouseleave", onMouseLeave);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            document.body.removeEventListener("mouseenter", onMouseEnter);
            document.body.removeEventListener("mouseleave", onMouseLeave);
        };
    }, []);

    return (
        <>
            {/* Main Cursor Dot */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-black dark:bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
            />
            {/* Follower Ring */}
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-8 h-8 border border-black dark:border-white rounded-full pointer-events-none z-[9998] mix-blend-difference hidden md:block"
            />
        </>
    );
}
