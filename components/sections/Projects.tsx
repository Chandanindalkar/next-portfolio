"use client";

import { useGSAP } from "@/hooks/useGSAP";
import { PROJECTS_DATA } from "@/lib/data";
import ProjectCard from "@/components/ui/ProjectCard";
import gsap from "gsap";
import { useRef } from "react";

export default function Projects() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(".project-card-container", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                end: "bottom 80%",
                toggleActions: "play none none reverse",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
        });
    }, []);

    return (
        <section
            ref={containerRef}
            id="projects"
            className="min-h-screen w-full py-24 px-4 bg-zinc-50 dark:bg-black/50"
        >
            <div className="mx-auto max-w-6xl">
                <h2 className="mb-16 text-5xl font-bold tracking-tight text-center md:text-left">
                    Selected Works
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {PROJECTS_DATA.map((project, idx) => (
                        <div key={idx} className="project-card-container">
                            <ProjectCard
                                title={project.title}
                                description={project.description}
                                tags={project.tags}
                                imageUrl={project.imageUrl}
                                demoUrl={project.demoUrl}
                                repoUrl={project.repoUrl}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
