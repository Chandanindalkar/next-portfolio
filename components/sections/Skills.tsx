"use client";

import { useGSAP } from "@/hooks/useGSAP";
import SkillPill from "@/components/ui/SkillPill";
import gsap from "gsap";
import { useRef } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Skills() {
    const containerRef = useRef<HTMLElement>(null);
    const { data: skills, error, isLoading } = useSWR("/api/skills", fetcher);

    useGSAP(() => {
        if (!skills) return;

        gsap.from(".skill-category", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                end: "bottom 80%",
                toggleActions: "play none none reverse",
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
        });
    }, [skills]);

    if (error) return null;

    return (
        <section
            ref={containerRef}
            id="skills"
            className="min-h-screen w-full py-24 px-4 bg-background"
        >
            <div className="mx-auto max-w-6xl">
                <h2 className="mb-16 text-5xl font-bold tracking-tight text-center md:text-left">
                    Skills & Stack
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {isLoading ? (
                        [1, 2, 3, 4].map((i) => (
                            <div key={i} className="space-y-6 animate-pulse">
                                <div className="h-8 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
                                <div className="flex flex-wrap gap-3">
                                    {[1, 2, 3, 4, 5].map((j) => (
                                        <div key={j} className="h-10 w-24 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        (skills as { category: string; items: { name: string; startDate: string }[] }[])?.map((category, idx) => (
                            <div key={idx} className="skill-category space-y-6">
                                <h3 className="text-2xl font-semibold text-zinc-400 dark:text-zinc-500">
                                    {category.category}
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {category.items.map((skill) => (
                                        <SkillPill
                                            key={skill.name}
                                            name={skill.name}
                                            startDate={skill.startDate}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

