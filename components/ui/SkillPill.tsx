"use client";

import { calculateDuration, cn } from "@/lib/utils";
import { useState } from "react";

interface SkillPillProps {
    name: string;
    startDate?: string;
    className?: string;
}

export default function SkillPill({ name, startDate, className }: SkillPillProps) {
    const [hovered, setHovered] = useState(false);
    const duration = startDate ? calculateDuration(startDate) : null;

    return (
        <div
            className={cn(
                "relative flex cursor-default items-center gap-2 overflow-hidden rounded-full border border-black/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-sm transition-all hover:bg-white/10 dark:border-white/10 dark:hover:bg-zinc-800",
                className
            )}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <span className="relative z-10 font-medium text-zinc-700 dark:text-zinc-200">
                {name}
            </span>

            {/* Dynamic Counter on Hover */}
            {duration && (
                <span
                    className={cn(
                        "relative z-10 ml-2 text-xs font-mono text-zinc-500 transition-all duration-300",
                        hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 w-0 overflow-hidden"
                    )}
                >
                    {duration}
                </span>
            )}
        </div>
    );
}
