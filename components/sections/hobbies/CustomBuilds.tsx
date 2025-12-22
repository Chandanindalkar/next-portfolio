"use client";

import { Hammer } from "lucide-react";
import Image from "next/image";

interface CustomBuild {
    id: string;
    title: string;
    description: string;
    specs: Record<string, string>;
    imageUrls: string[];
}

export default function CustomBuilds({ builds }: { builds?: CustomBuild[] }) {
    return (
        <div className="space-y-12">
            {builds && builds.length > 0 ? (
                builds.map((build) => (
                    <div key={build.id} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="relative aspect-video rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shadow-xl border border-zinc-200 dark:border-zinc-800">
                            <Image
                                src={build.imageUrls[0] || "https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=800"}
                                alt={build.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-3xl font-bold tracking-tight">{build.title}</h3>
                            <p className="text-zinc-500 leading-relaxed">{build.description}</p>

                            <div className="p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">
                                    <Hammer size={16} />
                                    Build Specs
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    {Object.entries(build.specs).map(([key, value]) => (
                                        <div key={key}>
                                            <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">{key}</div>
                                            <div className="text-sm font-bold">{String(value)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-20 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
                    <p className="text-zinc-500">No custom builds showcased yet.</p>
                </div>
            )}
        </div>
    );
}
