import prisma from "@/lib/prisma";
import { deleteProject, createProject } from "@/lib/actions/projects";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";

export default async function AdminProjects() {
    const projects = await prisma.project.findMany({
        orderBy: { order: "asc" },
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Project Management</h1>
                    <p className="text-zinc-500 dark:text-zinc-400">Add, edit, or remove projects from your portfolio.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Project List */}
                <div className="xl:col-span-2 space-y-4">
                    {projects.map((project) => (
                        <div key={project.id} className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center gap-6 group">
                            <div className="relative h-20 w-32 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                    src={project.imageUrls[0]}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold truncate">{project.title}</h3>
                                    <span className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-500">Order: {project.order}</span>
                                </div>
                                <p className="text-xs text-zinc-500 line-clamp-2">{project.description}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {project.techStack.map((tag) => (
                                        <span key={tag} className="text-[10px] bg-zinc-50 dark:bg-zinc-800/50 px-2 py-0.5 rounded-full border border-zinc-100 dark:border-zinc-800 text-zinc-400">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <form action={async () => {
                                    "use server";
                                    await deleteProject(project.id);
                                }}>
                                    <button type="submit" className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 text-red-500 transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Project Form */}
                <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 h-fit sticky top-24">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Plus size={20} className="text-zinc-400" />
                        Add New Project
                    </h2>
                    <form action={async (formData) => {
                        "use server";
                        await createProject(formData);
                    }} className="space-y-4">
                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Title</label>
                            <input name="title" required className="w-full mt-1 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-sm outline-none focus:ring-1 focus:ring-zinc-400" placeholder="Project Name" />
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Description</label>
                            <textarea name="description" required rows={3} className="w-full mt-1 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-sm outline-none focus:ring-1 focus:ring-zinc-400" placeholder="What is it about?" />
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Tech Stack (comma separated)</label>
                            <input name="techStack" required className="w-full mt-1 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-sm outline-none focus:ring-1 focus:ring-zinc-400" placeholder="Next.js, TypeScript, GSAP" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Role</label>
                                <input name="role" className="w-full mt-1 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-sm outline-none focus:ring-1 focus:ring-zinc-400" placeholder="e.g. Lead" />
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Order</label>
                                <input name="order" type="number" defaultValue={projects.length + 1} className="w-full mt-1 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-sm outline-none focus:ring-1 focus:ring-zinc-400" />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Image URL</label>
                            <input name="imageUrl" required className="w-full mt-1 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-sm outline-none focus:ring-1 focus:ring-zinc-400" placeholder="Unsplash URL or local path" />
                        </div>
                        <button type="submit" className="w-full mt-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-3 rounded-xl font-bold transition-transform hover:scale-[1.02] active:scale-[0.98]">
                            Publish Project
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
