import prisma from "@/lib/prisma";
import {
    Briefcase,
    Code2,
    MessageSquare,
    TrendingUp
} from "lucide-react";

async function getStats() {
    const [projectsCount, skillsCount, contactCount, analyticsCount] = await Promise.all([
        prisma.project.count(),
        prisma.skill.count(),
        prisma.contact.count(),
        prisma.analytics.count(),
    ]);

    return [
        { name: "Projects", count: projectsCount, icon: Briefcase, color: "text-blue-500" },
        { name: "Skills", count: skillsCount, icon: Code2, color: "text-purple-500" },
        { name: "Inquiries", count: contactCount, icon: MessageSquare, color: "text-orange-500" },
        { name: "Engagements", count: analyticsCount, icon: TrendingUp, color: "text-green-500" },
    ];
}

export default async function AdminDashboard() {
    const stats = await getStats();
    const recentInquiries = await prisma.contact.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
                <p className="text-zinc-500 dark:text-zinc-400">Welcome back. Here&apos;s what&apos;s happening with your portfolio.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 ${stat.color}`}>
                                <stat.icon size={20} />
                            </div>
                            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Total</span>
                        </div>
                        <div className="text-3xl font-bold">{stat.count}</div>
                        <div className="text-sm font-medium text-zinc-500 mt-1">{stat.name}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Inquiries */}
                <div className="lg:col-span-2 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                    <h2 className="text-xl font-bold mb-6">Recent Inquiries</h2>
                    <div className="space-y-4">
                        {recentInquiries.length > 0 ? (
                            recentInquiries.map((inquiry) => (
                                <div key={inquiry.id} className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                                    <div>
                                        <div className="font-bold">{inquiry.name}</div>
                                        <div className="text-xs text-zinc-500">{inquiry.email}</div>
                                    </div>
                                    <div className="text-xs font-mono text-zinc-400">
                                        {new Date(inquiry.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-zinc-500">No inquiries yet.</div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                    <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
                    <div className="space-y-3">
                        <button className="w-full text-left p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                            <div className="font-bold">Add New Project</div>
                            <div className="text-xs text-zinc-500">Create a case study</div>
                        </button>
                        <button className="w-full text-left p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                            <div className="font-bold">Update Skills</div>
                            <div className="text-xs text-zinc-500">Manage your tech stack</div>
                        </button>
                        <button className="w-full text-left p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                            <div className="font-bold">Site Analytics</div>
                            <div className="text-xs text-zinc-500">View visitor traffic</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
