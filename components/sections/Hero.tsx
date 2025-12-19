"use client";

import { useGSAP } from "@/components/hooks/useGSAP";
import gsap from "gsap";
import { useRef } from "react";

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ delay: 0.5 }); // Wait for Preloader slightly

        // Animate Words/Characters
        tl.from(".hero-text-line", {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power4.out",
        });

        tl.from(".hero-subtext", {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power2.out",
        }, "-=0.5");

        tl.from(".scroll-indicator", {
            opacity: 0,
            y: -10,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        }, "-=0.2");

    }, []);

    return (
        <section
            ref={containerRef}
            id="hero"
            className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-4"
        >
            <div className="z-10 flex flex-col items-center justify-center text-center mix-blend-difference">
                <h1 ref={textRef} className="flex flex-col text-[10vw] font-black leading-none tracking-tighter text-foreground uppercase md:text-[8vw]">
                    <span className="hero-text-line block">Creative</span>
                    <span className="hero-text-line block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Developer</span>
                </h1>
                <p className="hero-subtext mt-8 max-w-lg text-lg font-light text-zinc-500 md:text-xl dark:text-zinc-400">
                    Building digital experiences with a focus on motion, aesthetics, and performance.
                </p>
            </div>

            <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-zinc-400">Scroll</span>
                <div className="h-10 w-[1px] bg-zinc-400"></div>
            </div>

            {/* Background Gradient Blob */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[50vw] w-[50vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/20 blur-[100px] pointer-events-none" />
        </section>
    );
}
