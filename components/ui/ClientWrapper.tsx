"use client";

import { useGSAP } from "@/components/hooks/useGSAP";
import { ReactNode } from "react";

interface ClientWrapperProps {
    children: ReactNode;
    className?: string;
    // Callback for GSAP animations
    onMount?: (scope: React.RefObject<HTMLDivElement>) => void;
}

export default function ClientWrapper({
    children,
    className = "",
    onMount,
}: ClientWrapperProps) {
    const { scope } = useGSAP(() => {
        if (onMount && scope.current) {
            // We pass the scope to the callback so the user can use scope.current selector
            // But useGSAP expects the effect itself to do the work.
            // Actually, let's just let useGSAP handle the scope context, 
            // and calling onMount inside it allows specialized logic.
        }
    }, []);

    // If we really want to just run animations passed in props:
    // But usually we build specific interactive components.
    // This wrapper is just to ensure 'use client' boundary if needed.

    return (
        <div ref={scope} className={className}>
            {children}
        </div>
    );
}
