"use client";

import useSWR from "swr";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

// Fetcher for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SpotifyWidget({ className }: { className?: string }) {
    const { data, error, isLoading } = useSWR("/api/spotify", fetcher, {
        refreshInterval: 10000, // Poll every 10s
    });

    if (isLoading) {
        return (
            <div className={cn("flex h-full items-center gap-4 animate-pulse", className)}>
                <div className="h-12 w-12 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex-1 space-y-2">
                    <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-3 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className={cn("flex h-full items-center gap-4", className)}>
                <div className="h-12 w-12 rounded bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400"><path d="M9 18V5l12-2v13" /><path d="m9 9 12-2" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
                </div>
                <div>
                    <p className="font-bold text-sm">Not Playing</p>
                    <p className="text-xs text-zinc-500">Spotify</p>
                </div>
            </div>
        );
    }

    return (
        <Link
            href={data.songUrl}
            target="_blank"
            className={cn("flex h-full items-center gap-4 group", className)}
        >
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-zinc-800">
                {data.isPlaying && (
                    <Image
                        src={data.albumImageUrl}
                        alt={data.album}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                )}
            </div>

            <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate text-zinc-800 dark:text-zinc-200">{data.title}</p>
                <p className="text-xs text-zinc-500 truncate">{data.artist}</p>
            </div>

            {data.isPlaying && (
                <div className="flex gap-0.5 items-end h-4 mb-2">
                    <span className="w-1 bg-green-500 animate-[music-bar_1s_ease-in-out_infinite]" style={{ animationDelay: '0s' }} />
                    <span className="w-1 bg-green-500 animate-[music-bar_1.2s_ease-in-out_infinite]" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1 bg-green-500 animate-[music-bar_0.8s_ease-in-out_infinite]" style={{ animationDelay: '0.4s' }} />
                </div>
            )}
        </Link>
    );
}
