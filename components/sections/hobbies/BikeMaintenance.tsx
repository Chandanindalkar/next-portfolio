"use client";

import { Wrench, Clock } from "lucide-react";
import Image from "next/image";

interface MaintenanceLog {
    id: string;
    title: string;
    description: string;
    beforeImages: string[];
    afterImages: string[];
    date: string;
}

export default function BikeMaintenance({ logs }: { logs?: MaintenanceLog[] }) {
    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 gap-8">
                {logs && logs.length > 0 ? (
                    logs.map((log) => (
                        <div key={log.id} className="group overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                {/* Before/After Visuals */}
                                <div className="relative h-64 md:h-auto flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
                                    <div className="grid grid-cols-2 h-full w-full">
                                        <div className="relative border-r border-white/10">
                                            <Image
                                                src={log.beforeImages[0] || "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800"}
                                                alt="Before"
                                                fill
                                                className="object-cover grayscale opacity-50"
                                            />
                                            <div className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest text-white drop-shadow-md">Before</div>
                                        </div>
                                        <div className="relative">
                                            <Image
                                                src={log.afterImages[0] || "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800"}
                                                alt="After"
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute top-4 right-4 text-xs font-bold uppercase tracking-widest text-white drop-shadow-md">After</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    <div className="flex items-center gap-2 mb-4 text-xs font-mono text-zinc-400">
                                        <Clock size={12} />
                                        {new Date(log.date).toLocaleDateString()}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{log.title}</h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {log.description}
                                    </p>
                                    <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-purple-500 transition-colors">
                                        <Wrench size={14} />
                                        View Full Log
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
                        <Wrench size={48} className="mx-auto mb-4 text-zinc-200 dark:text-zinc-800" />
                        <p className="text-zinc-500">No maintenance logs recorded yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
