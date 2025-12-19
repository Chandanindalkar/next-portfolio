"use client";

import { useGSAP } from "@/hooks/useGSAP";
import { HOBBIES_DATA } from "@/lib/data";
import gsap from "gsap";
import { useRef } from "react";

export default function Hobbies() {
    const containerRef = useRef<HTMLElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Horizontal Scroll Trigger
        const slider = sliderRef.current;
        if (!slider) return;

        gsap.to(slider, {
            x: "-50%", // Move half the width (assuming cloned content for infinite feel or just long list)
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1, // Smooth scrubbing
            },
        });
    }, []);

    return (
        <section
            ref={containerRef}
            id="hobbies"
            className="w-full py-24 overflow-hidden bg-zinc-50 dark:bg-black/50"
        >
            <div className="mx-auto max-w-6xl px-4 mb-12">
                <h2 className="text-5xl font-bold tracking-tight text-center md:text-left">
                    Beyond Code
                </h2>
            </div>

            <div className="flex w-max gap-8 px-4" ref={sliderRef}>
                {/* Double the data for simple visual overflow/loop effect */}
                {[...HOBBIES_DATA, ...HOBBIES_DATA].map((hobby, idx) => (
                    <div
                        key={idx}
                        className="flex h-[300px] w-[250px] flex-col justify-between rounded-3xl bg-white p-8 shadow-sm transition-transform hover:-translate-y-2 dark:bg-zinc-900"
                    >
                        <div className="text-6xl">{hobby.emoji}</div>
                        <div>
                            <h3 className="mb-2 text-2xl font-bold">{hobby.name}</h3>
                            <p className="text-sm text-zinc-500">{hobby.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
