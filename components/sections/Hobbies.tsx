"use client";

import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import { useRef, useState } from "react";
import useSWR from "swr";
import BikeJourney from "./hobbies/BikeJourney";
import BikeMaintenance from "./hobbies/BikeMaintenance";
import Watches from "./hobbies/Watches";
import CustomBuilds from "./hobbies/CustomBuilds";
import { cn } from "@/lib/utils";

const tabs = [
    { id: "biking", label: "Biking Journey", emoji: "🚴" },
    { id: "maintenance", label: "Maintenance", emoji: "🔧" },
    { id: "watches", label: "Watches", emoji: "⌚" },
    { id: "builds", label: "Custom Builds", emoji: "🛹" },
];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Hobbies() {
    const containerRef = useRef<HTMLElement>(null);
    const [activeTab, setActiveTab] = useState("biking");

    const { data: bikingData } = useSWR("/api/hobbies/biking", fetcher);
    const { data: maintenanceData } = useSWR("/api/hobbies/maintenance", fetcher);
    const { data: watchesData } = useSWR("/api/hobbies/watches", fetcher);
    const { data: buildsData } = useSWR("/api/hobbies/builds", fetcher);

    useGSAP(() => {
        gsap.from(".hobby-tab-content", {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: "power2.out",
        });
    }, [activeTab]);

    return (
        <section
            ref={containerRef}
            id="hobbies"
            className="w-full py-24 bg-zinc-50 dark:bg-black/50"
        >
            <div className="mx-auto max-w-6xl px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <h2 className="text-5xl font-bold tracking-tight mb-4">
                            Beyond Code
                        </h2>
                        <p className="text-zinc-500 max-w-md">
                            When I&apos;m not pushing pixels or debugging logic, you&apos;ll probably find me tinkering with one of these.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 p-1 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-2xl backdrop-blur-sm">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
                                    activeTab === tab.id
                                        ? "bg-white dark:bg-zinc-100 text-black shadow-sm scale-105"
                                        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                                )}
                            >
                                <span>{tab.emoji}</span>
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="hobby-tab-content min-h-[400px]">
                    {activeTab === "biking" && <BikeJourney stats={bikingData?.stats} />}
                    {activeTab === "maintenance" && <BikeMaintenance logs={maintenanceData} />}
                    {activeTab === "watches" && <Watches collection={watchesData} />}
                    {activeTab === "builds" && <CustomBuilds builds={buildsData} />}
                </div>
            </div>
        </section>
    );
}

