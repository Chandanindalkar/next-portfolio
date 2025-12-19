"use client";

import { useGSAP } from "@/hooks/useGSAP";
import { SKILLS_DATA } from "@/lib/data";
import SkillPill from "@/components/ui/SkillPill";
import gsap from "gsap";
import { useRef } from "react";

export default function Skills() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
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
    }, []);

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
                    {SKILLS_DATA.map((category, idx) => (
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
                    ))}
                </div>
            </div>
        </section>
    );
}
