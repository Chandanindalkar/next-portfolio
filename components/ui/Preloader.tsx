"use client";

import { useGSAP } from "@/hooks/useGSAP";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [complete, setComplete] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                setComplete(true);
                document.body.style.overflow = "auto"; // Restore scroll
            }
        });

        // Prevent scroll during load
        document.body.style.overflow = "hidden";

        // Example animation: Reveal text then slide up
        tl.to(".loader-text", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
        })
            .to(".loader-text", {
                opacity: 0,
                y: -50,
                duration: 0.5,
                delay: 0.5,
                ease: "power3.in",
            })
            .to(containerRef.current, {
                yPercent: -100,
                duration: 0.8,
                ease: "expo.inOut",
            });

    }, []);

    if (complete) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white dark:bg-black"
        >
            <div className="overflow-hidden">
                <h1 className="loader-text translate-y-full opacity-0 text-4xl font-bold text-black dark:text-white">
                    Hello.
                </h1>
            </div>
            <div className="overflow-hidden">
                <h1 className="loader-text translate-y-full opacity-0 text-4xl font-bold text-black dark:text-white">
                    Welcome.
                </h1>
            </div>
        </div>
    );
}
