"use client";

import { MapPin, Globe, Route } from "lucide-react";

interface BikeJourneyProps {
    stats?: {
        totalKm: number;
        bikesOwned: number;
        tripsCompleted: number;
    };
}

export default function BikeJourney({ stats }: BikeJourneyProps) {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <Route className="mb-4 text-purple-500" size={24} />
                    <div className="text-3xl font-bold">{stats?.totalKm || 0} km</div>
                    <div className="text-sm text-zinc-500">Total Traveled</div>
                </div>
                <div className="p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <Globe className="mb-4 text-blue-500" size={24} />
                    <div className="text-3xl font-bold">{stats?.tripsCompleted || 0}</div>
                    <div className="text-sm text-zinc-500">Trips Completed</div>
                </div>
                <div className="p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <MapPin className="mb-4 text-green-500" size={24} />
                    <div className="text-3xl font-bold">{stats?.bikesOwned || 0}</div>
                    <div className="text-sm text-zinc-500">Bikes Owned</div>
                </div>
            </div>

            <div className="relative h-[400px] w-full rounded-2xl bg-zinc-200 dark:bg-zinc-800 overflow-hidden flex items-center justify-center border border-zinc-300 dark:border-zinc-700">
                <div className="text-zinc-400 font-mono text-sm uppercase tracking-widest text-center">
                    <Globe size={48} className="mx-auto mb-4 opacity-20" />
                    Interactive Map Interface<br />
                    [Leaflet Integration Pending Content]
                </div>
            </div>
        </div>
    );
}
