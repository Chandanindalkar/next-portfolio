"use client";

import Image from "next/image";

interface Watch {
    id: string;
    brand: string;
    model: string;
    movement: string;
    year?: number;
    description?: string;
    imageUrls: string[];
    specs: Record<string, string>;
}

export default function Watches({ collection }: { collection?: Watch[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collection && collection.length > 0 ? (
                collection.map((watch) => (
                    <div key={watch.id} className="group relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-xl">
                        <div className="relative aspect-square overflow-hidden">
                            <Image
                                src={watch.imageUrls[0] || "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800"}
                                alt={`${watch.brand} ${watch.model}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                                <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1">{watch.brand}</div>
                                <div className="text-xl font-bold">{watch.model}</div>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex flex-wrap gap-2">
                                <span className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">{watch.movement}</span>
                                {watch.year && <span className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">{watch.year}</span>}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col-span-full text-center py-20 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
                    <p className="text-zinc-500">No watches in the collection yet.</p>
                </div>
            )}
        </div>
    );
}
