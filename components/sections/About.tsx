"use client";

import { useGSAP } from "@/hooks/useGSAP";
import BentoCard from "@/components/ui/BentoCard";
import gsap from "gsap";
import { useRef } from "react";

export default function About() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(".bento-card", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                end: "bottom 80%",
                toggleActions: "play none none reverse",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
        });
    }, []);

    return (
        <section
            ref={containerRef}
            id="about"
            className="min-h-screen w-full py-24 px-4 bg-zinc-50 dark:bg-black/50"
        >
            <div className="mx-auto max-w-6xl">
                <h2 className="mb-12 text-5xl font-bold tracking-tight text-center md:text-left">
                    About Me
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
                    {/* Bio Card - Large */}
                    <BentoCard colSpan={2} rowSpan={2} title="Bio" className="bento-card">
                        <div className="flex h-full flex-col justify-between">
                            <p className="text-xl leading-relaxed text-zinc-600 dark:text-zinc-300">
                                I am a passionate software engineer specializing in building exceptional digital experiences.
                                Currently focused on React/Next.js and bridging the gap between design and engineering.
                            </p>
                            <div className="mt-4">
                                <span className="inline-block px-3 py-1 text-xs font-mono rounded-full border border-zinc-200 dark:border-zinc-800">
                                    Based in [Location]
                                </span>
                            </div>
                        </div>
                    </BentoCard>

                    {/* Currently - Standard */}
                    <BentoCard colSpan={1} className="bento-card" title="Currently">
                        <div className="flex h-full flex-col justify-center">
                            <h4 className="text-xl font-bold">Software Engineer</h4>
                            <p className="text-sm text-zinc-500">@ Tech Company</p>
                        </div>
                    </BentoCard>

                    {/* Previously - Standard */}
                    <BentoCard colSpan={1} className="bento-card" title="Previously">
                        <div className="flex h-full flex-col justify-center">
                            <h4 className="text-xl font-bold">Frontend Dev</h4>
                            <p className="text-sm text-zinc-500">@ Startup Inc</p>
                        </div>
                    </BentoCard>

                    {/* Listening / Spotify - Wide */}
                    <BentoCard colSpan={2} className="bento-card" title="Listening">
                        <div className="flex h-full items-center gap-4">
                            <div className="h-12 w-12 rounded bg-green-500 animate-pulse" /> {/* Placeholder Album Art */}
                            <div>
                                <p className="font-bold">Not Playing</p>
                                <p className="text-xs text-zinc-500">Spotify</p>
                            </div>
                            {/* Visualizer bars placeholder */}
                            <div className="ml-auto flex gap-1 items-end h-8">
                                <div className="w-1 h-3 bg-green-500 rounded-full" />
                                <div className="w-1 h-6 bg-green-500 rounded-full" />
                                <div className="w-1 h-4 bg-green-500 rounded-full" />
                            </div>
                        </div>
                    </BentoCard>

                    {/* Studied - Standard */}
                    <BentoCard colSpan={1} className="bento-card" title="Studied">
                        <div className="flex h-full flex-col justify-center">
                            <h4 className="text-sm font-bold">B.E. Computer Science</h4>
                            <p className="text-xs text-zinc-500">University Name</p>
                        </div>
                    </BentoCard>

                    {/* Tech Stack / Tools - Standard */}
                    <BentoCard colSpan={1} className="bento-card" title="Toolkit">
                        <div className="flex flex-wrap gap-2">
                            <span className="text-xs border px-2 py-1 rounded">Next.js</span>
                            <span className="text-xs border px-2 py-1 rounded">TS</span>
                            <span className="text-xs border px-2 py-1 rounded">GSAP</span>
                        </div>
                    </BentoCard>

                </div>
            </div>
        </section>
    );
}
