"use client";

import { useGSAP } from "@/hooks/useGSAP";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { Home, User, Code2, Briefcase, Heart, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
    { id: "hero", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "hobbies", label: "Hobbies", icon: Heart },
    { id: "contact", label: "Contact", icon: MessageSquare },
];

export default function FloatingNav() {
    const [activeTab, setActiveTab] = useState("hero");

    useGSAP(() => {
        gsap.from(".floating-nav", {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
            delay: 2, // Show after hero animation
        });
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => document.getElementById(item.id));
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            sections.forEach(section => {
                if (!section) return;
                const top = section.offsetTop;
                const height = section.offsetHeight;

                if (scrollPosition >= top && scrollPosition < top + height) {
                    setActiveTab(section.id);
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="floating-nav fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <nav className="flex items-center gap-1 p-2 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className={cn(
                            "relative group p-3 rounded-full transition-all duration-300",
                            activeTab === item.id
                                ? "bg-white dark:bg-zinc-100 text-black scale-110 shadow-lg"
                                : "text-zinc-400 hover:text-white hover:bg-white/10"
                        )}
                    >
                        <item.icon size={20} />
                        <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-black text-white text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            {item.label}
                        </span>
                    </button>
                ))}
            </nav>
        </div>
    );
}
