"use client";

import { useGSAP } from "@/hooks/useGSAP";
import ProjectCard from "@/components/ui/ProjectCard";
import gsap from "gsap";
import { useRef } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Projects() {
    const containerRef = useRef<HTMLElement>(null);
    const { data: projects, error, isLoading } = useSWR("/api/projects", fetcher);

    useGSAP(() => {
        if (!projects) return;

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
    }, [projects]);

    if (error) return null; // Silent fail for aesthetics, or could show error

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
                    {isLoading ? (
                        // Basic skeletons
                        [1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-video w-full animate-pulse rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
                        ))
                    ) : (
                        (projects as { id: string; title: string; description: string; techStack: string[]; imageUrls: string[] }[])?.map((project) => (
                            <div key={project.id} className="project-card-container">
                                <ProjectCard
                                    title={project.title}
                                    description={project.description}
                                    tags={project.techStack}
                                    imageUrl={project.imageUrls[0]}
                                    demoUrl="#" // Not in DB yet, keeping placeholders
                                    repoUrl="#"
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

