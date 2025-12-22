import prisma from "@/lib/prisma";
import {
    updateBikeStats,
    createBikeTrip,
    createMaintenanceLog,
    createWatch,
    createCustomBuild,
    deleteHobbyItem
} from "@/lib/actions/hobbies";
import {
    Route,
    Wrench,
    Watch as WatchIcon,
    Hammer,
    Plus,
    Trash2,
    ShieldCheck
} from "lucide-react";

export default async function AdminHobbies() {
    const [stats, trips, logs, watches, builds] = await Promise.all([
        prisma.bikeStats.findFirst(),
        prisma.bikeTrip.findMany({ orderBy: { date: "desc" } }),
        prisma.bikeMaintenance.findMany({ orderBy: { date: "desc" } }),
        prisma.watch.findMany({ orderBy: { order: "asc" } }),
        prisma.customBuild.findMany({ orderBy: { createdAt: "desc" } }),
    ]);

    return (
        <div className="space-y-8 max-w-5xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Hobbies Management</h1>
                <p className="text-zinc-500">Update your biking journey, watch collection, and custom builds.</p>
            </div>

            {/* 1. Global Bike Stats */}
            <section className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <ShieldCheck className="text-purple-500" size={20} />
                    Lifetime Biking Stats
                </h2>
                <form action={updateBikeStats} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Total KM</label>
                        <input name="totalKm" type="number" step="0.1" defaultValue={stats?.totalKm} className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Bikes Owned</label>
                        <input name="bikesOwned" type="number" defaultValue={stats?.bikesOwned} className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Trips Completed</label>
                        <input name="tripsCompleted" type="number" defaultValue={stats?.tripsCompleted} className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <button type="submit" className="md:col-span-3 bg-black dark:bg-white text-white dark:text-black py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
                        Save Stats
                    </button>
                </form>
            </section>

            {/* 2. Bike Trips */}
            <section className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Route className="text-blue-500" size={20} />
                    Biking Journeys
                </h2>
                <form action={createBikeTrip} className="space-y-4 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="location" placeholder="Location Name" className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800" required />
                        <input name="date" type="date" className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800" required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input name="latitude" type="number" step="any" placeholder="Latitude" className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800" required />
                        <input name="longitude" type="number" step="any" placeholder="Longitude" className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800" required />
                        <input name="distance" type="number" step="0.1" placeholder="Distance (km)" className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800" />
                    </div>
                    <textarea name="description" placeholder="Short story..." className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 h-24" />
                    <button type="submit" className="w-full bg-zinc-100 dark:bg-zinc-800 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors">
                        <Plus size={18} /> Add Trip
                    </button>
                </form>

                <div className="space-y-2">
                    {trips.map(trip => (
                        <div key={trip.id} className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                            <div>
                                <div className="font-bold">{trip.location}</div>
                                <div className="text-xs text-zinc-500">{new Date(trip.date).toLocaleDateString()} • {trip.distance} km</div>
                            </div>
                            <form action={async () => { "use server"; await deleteHobbyItem("trip", trip.id); }}>
                                <button className="p-2 text-zinc-400 hover:text-red-500 transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </form>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Maintenance */}
            <section className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Wrench className="text-orange-500" size={20} />
                    Maintenance Logs
                </h2>
                <form action={createMaintenanceLog} className="space-y-4 mb-8">
                    <input name="title" placeholder="Service Title (e.g. Chain Replacement)" className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800" required />
                    <input name="date" type="date" className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800" required />
                    <textarea name="description" placeholder="Describe the work done..." className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 h-24" />
                    <button type="submit" className="w-full bg-zinc-100 dark:bg-zinc-800 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors">
                        <Plus size={18} /> Add Log
                    </button>
                </form>

                <div className="space-y-2">
                    {logs.map(log => (
                        <div key={log.id} className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                            <div>
                                <div className="font-bold">{log.title}</div>
                                <div className="text-xs text-zinc-500">{new Date(log.date).toLocaleDateString()}</div>
                            </div>
                            <form action={async () => { "use server"; await deleteHobbyItem("maintenance", log.id); }}>
                                <button className="p-2 text-zinc-400 hover:text-red-500 transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </form>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Watches */}
            <section className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <WatchIcon className="text-blue-400" size={20} />
                    Watch Collection
                </h2>
                <form action={createWatch} className="space-y-4 mb-8">
                    <div className="grid grid-cols-2 gap-4">
                        <input name="brand" placeholder="Brand" className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800" required />
                        <input name="model" placeholder="Model" className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input name="movement" placeholder="Movement (Automatic, Quartz...)" className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800" required />
                        <input name="year" type="number" placeholder="Year" className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800" />
                    </div>
                    <button type="submit" className="w-full bg-zinc-100 dark:bg-zinc-800 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors">
                        <Plus size={18} /> Add Watch
                    </button>
                </form>

                <div className="space-y-2">
                    {watches.map(watch => (
                        <div key={watch.id} className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                            <div>
                                <div className="font-bold">{watch.brand} {watch.model}</div>
                                <div className="text-xs text-zinc-500">{watch.movement} • {watch.year}</div>
                            </div>
                            <form action={async () => { "use server"; await deleteHobbyItem("watch", watch.id); }}>
                                <button className="p-2 text-zinc-400 hover:text-red-500 transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </form>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. Custom Builds */}
            <section className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Hammer className="text-yellow-500" size={20} />
                    Custom Builds
                </h2>
                <form action={createCustomBuild} className="space-y-4 mb-8">
                    <input name="title" placeholder="Build Title (e.g. Bamboo Longboard)" className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800" required />
                    <textarea name="description" placeholder="Build process and materials..." className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 h-24" />
                    <button type="submit" className="w-full bg-zinc-100 dark:bg-zinc-800 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors">
                        <Plus size={18} /> Add Build
                    </button>
                </form>

                <div className="space-y-2">
                    {builds.map(build => (
                        <div key={build.id} className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                            <div>
                                <div className="font-bold">{build.title}</div>
                                <div className="text-xs text-zinc-500">Created: {new Date(build.createdAt).toLocaleDateString()}</div>
                            </div>
                            <form action={async () => { "use server"; await deleteHobbyItem("build", build.id); }}>
                                <button className="p-2 text-zinc-400 hover:text-red-500 transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </form>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
