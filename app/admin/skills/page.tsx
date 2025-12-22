import prisma from "@/lib/prisma";
import { deleteSkill, createSkill } from "@/lib/actions/skills";
import { Plus, Trash2 } from "lucide-react";

export default async function AdminSkills() {
    const skills = await prisma.skill.findMany({
        orderBy: { category: "asc" },
    });

    // Group by category for display
    const groupedSkills = skills.reduce((acc: Record<string, typeof skills>, skill) => {
        const cat = skill.category || "Misc";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill);
        return acc;
    }, {});

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Skills & Tech Stack</h1>
                <p className="text-zinc-500 dark:text-zinc-400">Manage the technologies you showcased on your portfolio.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Skills List */}
                <div className="lg:col-span-2 space-y-8">
                    {Object.entries(groupedSkills).map(([category, items]) => (
                        <div key={category} className="space-y-4">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                                {category}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {items.map((skill) => (
                                    <div key={skill.id} className="p-3 rounded-xl border border-zinc-100 dark:border-zinc-800/50 bg-white dark:bg-zinc-900 flex items-center justify-between group">
                                        <div>
                                            <div className="font-bold text-sm">{skill.name}</div>
                                            <div className="text-[10px] text-zinc-500 font-mono">
                                                Started: {new Date(skill.startDate).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <form action={async () => {
                                            "use server";
                                            await deleteSkill(skill.id);
                                        }} className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button type="submit" className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 text-red-500 transition-colors">
                                                <Trash2 size={14} />
                                            </button>
                                        </form>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Skill Form */}
                <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 h-fit sticky top-24">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Plus size={20} className="text-zinc-400" />
                        Add New Skill
                    </h2>
                    <form action={async (formData) => {
                        "use server";
                        await createSkill(formData);
                    }} className="space-y-4">
                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Skill Name</label>
                            <input name="name" required className="w-full mt-1 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-sm outline-none focus:ring-1 focus:ring-zinc-400" placeholder="e.g. React" />
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Category</label>
                            <select name="category" required className="w-full mt-1 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-sm outline-none focus:ring-1 focus:ring-zinc-400">
                                <option value="Languages">Languages</option>
                                <option value="Frontend">Frontend</option>
                                <option value="Backend">Backend</option>
                                <option value="Tools">Tools</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Start Date</label>
                            <input name="startDate" type="date" required className="w-full mt-1 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-sm outline-none focus:ring-1 focus:ring-zinc-400" />
                        </div>
                        <button type="submit" className="w-full mt-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-3 rounded-xl font-bold transition-transform hover:scale-[1.02] active:scale-[0.98]">
                            Add to Stack
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
