import prisma from "@/lib/prisma";
import { Mail, Clock, Calendar, ArrowRight } from "lucide-react";

export default async function AdminInquiries() {
    const inquiries = await prisma.contact.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Inquiries</h1>
                <p className="text-zinc-500 dark:text-zinc-400">Messages sent through your portfolio contact form.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {inquiries.length > 0 ? (
                    inquiries.map((inquiry) => (
                        <div key={inquiry.id} className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">{inquiry.name}</h3>
                                        <p className="text-sm text-zinc-500">{inquiry.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={12} />
                                        {new Date(inquiry.createdAt).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock size={12} />
                                        {new Date(inquiry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                {inquiry.subject && (
                                    <div className="text-xs font-bold uppercase tracking-widest text-zinc-400">Subject: {inquiry.subject}</div>
                                )}
                                <p className="text-sm text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl leading-relaxed">
                                    {inquiry.message}
                                </p>
                            </div>

                            <div className="mt-4 flex justify-end">
                                <a href={`mailto:${inquiry.email}`} className="flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                    Reply via Email <ArrowRight size={12} />
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-24 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
                        <MessageSquare size={48} className="mx-auto text-zinc-200 dark:text-zinc-800 mb-4" />
                        <p className="text-zinc-500">No messages yet. Keep sharing your work!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

import { MessageSquare } from "lucide-react";
