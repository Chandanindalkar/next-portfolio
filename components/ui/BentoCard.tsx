import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoCardProps {
    children: ReactNode;
    className?: string;
    title?: string;
    colSpan?: 1 | 2 | 3 | 4;
    rowSpan?: 1 | 2;
}

export default function BentoCard({
    children,
    className,
    title,
    colSpan = 1,
    rowSpan = 1,
}: BentoCardProps) {
    return (
        <div
            className={cn(
                "group relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-white/5 dark:bg-zinc-900/50 p-6 backdrop-blur-md transition-colors hover:bg-white/10 dark:hover:bg-zinc-900/80",
                // Grid column spans
                colSpan === 1 && "col-span-1",
                colSpan === 2 && "col-span-1 md:col-span-2",
                colSpan === 3 && "col-span-1 md:col-span-3",
                // Grid row spans
                rowSpan === 1 && "row-span-1",
                rowSpan === 2 && "row-span-1 md:row-span-2",
                className
            )}
        >
            {title && (
                <h3 className="mb-4 text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                    {title}
                </h3>
            )}
            <div className="relative z-10 h-full">{children}</div>
        </div>
    );
}
