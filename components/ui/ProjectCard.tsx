"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    imageUrl: string;
    demoUrl?: string;
    repoUrl?: string;
    className?: string;
}

export default function ProjectCard({
    title,
    description,
    tags,
    imageUrl,
    demoUrl,
    repoUrl,
    className,
}: ProjectCardProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className={cn(
                "group relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900",
                className
            )}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Background Image */}
            <Image
                src={imageUrl}
                alt={title}
                fill
                className={cn(
                    "object-cover transition-transform duration-700 ease-out",
                    hovered ? "scale-105 blur-sm brightness-50" : "scale-100"
                )}
            />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h3 className="text-2xl font-bold text-white drop-shadow-md translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                    {title}
                </h3>
                <p className="mt-2 text-sm text-zinc-200 line-clamp-2 translate-y-4 transition-transform duration-300 delay-75 group-hover:translate-y-0">
                    {description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 translate-y-4 transition-transform duration-300 delay-100 group-hover:translate-y-0">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="mt-6 flex gap-4 translate-y-4 transition-transform duration-300 delay-150 group-hover:translate-y-0">
                    {demoUrl && (
                        <Link
                            href={demoUrl}
                            className="rounded-full bg-white px-4 py-2 text-xs font-bold text-black transition-transform hover:scale-105"
                        >
                            View Demo
                        </Link>
                    )}
                    {repoUrl && (
                        <Link
                            href={repoUrl}
                            className="rounded-full border border-white/30 bg-black/50 px-4 py-2 text-xs font-bold text-white backdrop-blur-md transition-transform hover:scale-105 hover:bg-black/70"
                        >
                            GitHub
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
