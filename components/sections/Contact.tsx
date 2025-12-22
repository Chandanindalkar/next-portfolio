"use client";

import { useGSAP } from "@/hooks/useGSAP";
import { SOCIAL_LINKS } from "@/lib/data";
import { ArrowUpRight, Mail } from "lucide-react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function Contact() {
    const containerRef = useRef<HTMLElement>(null);
    const [copied, setCopied] = useState(false);

    const copyEmail = () => {
        navigator.clipboard.writeText("hello@example.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useGSAP(() => {
        gsap.from(".contact-reveal", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
        });
    }, []);

    return (
        <section
            element-id="contact"
            ref={containerRef}
            className="relative min-h-[80vh] w-full flex flex-col justify-between bg-zinc-950 px-4 pt-24 pb-8 text-white"
        >
            <div className="mx-auto w-full max-w-6xl">
                {/* Header */}
                <div className="contact-reveal mb-24">
                    <h2 className="text-[12vw] font-black leading-[0.8] tracking-tighter uppercase text-zinc-800 dark:text-zinc-800">
                        Let&apos;s Talk
                    </h2>
                    <div className="mt-8 flex items-center justify-between border-t border-white/20 pt-8">
                        <p className="max-w-md text-lg text-zinc-400">
                            Interested in working together or just want to verify some code? Drop me a line.
                        </p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="contact-reveal mb-24 grid grid-cols-1 gap-12 md:grid-cols-2">
                    <div>
                        <button
                            onClick={copyEmail}
                            className="group mb-8 flex items-center gap-4 rounded-full bg-white px-8 py-4 text-xl font-bold text-black transition-transform hover:scale-105 active:scale-95"
                        >
                            <Mail size={24} />
                            <span>hello@example.com</span>
                            <span className={cn(
                                "ml-2 rounded-full bg-black/10 px-2 py-1 text-xs transition-colors",
                                copied ? "bg-green-500 text-white" : "text-black/50"
                            )}>
                                {copied ? "Copied!" : "Copy"}
                            </span>
                        </button>
                        <p className="text-zinc-500">
                            Prefer forms? Use the one on the right to send a direct message.
                        </p>
                    </div>

                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const data = Object.fromEntries(formData);

                            try {
                                const res = await fetch("/api/contact", {
                                    method: "POST",
                                    body: JSON.stringify(data),
                                });
                                if (res.ok) {
                                    alert("Message sent successfully!");
                                    (e.target as HTMLFormElement).reset();
                                } else {
                                    alert("Failed to send message.");
                                }
                            } catch {
                                alert("An error occurred.");
                            }
                        }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name *"
                                required
                                className="w-full rounded-xl bg-white/5 border border-white/10 p-4 focus:outline-none focus:border-zinc-500 transition-colors"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email *"
                                required
                                className="w-full rounded-xl bg-white/5 border border-white/10 p-4 focus:outline-none focus:border-zinc-500 transition-colors"
                            />
                        </div>
                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            className="w-full rounded-xl bg-white/5 border border-white/10 p-4 focus:outline-none focus:border-zinc-500 transition-colors"
                        />
                        <textarea
                            name="message"
                            placeholder="Message *"
                            required
                            rows={4}
                            className="w-full rounded-xl bg-white/5 border border-white/10 p-4 focus:outline-none focus:border-zinc-500 transition-colors"
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-zinc-100 py-4 font-bold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Footer Grid */}
                <div className="contact-reveal grid grid-cols-1 gap-12 border-t border-white/10 pt-12 md:grid-cols-4">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="mb-6 font-mono text-xs uppercase tracking-widest text-zinc-500">Socials</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {SOCIAL_LINKS.map((link) => (
                                <a
                                    key={link.platform}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-2 text-zinc-400 transition-colors hover:text-white"
                                >
                                    <span>{link.platform}</span>
                                    <ArrowUpRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-6 font-mono text-xs uppercase tracking-widest text-zinc-500">Timezone</h3>
                        <p className="text-2xl font-bold">UTC+05:30</p>
                        <p className="text-sm text-zinc-500">Local Time</p>
                    </div>

                    <div>
                        <h3 className="mb-6 font-mono text-xs uppercase tracking-widest text-zinc-500">Status</h3>
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <p className="font-bold">Available for freelance</p>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="contact-reveal mt-24 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-zinc-600 md:flex-row">
                    <p>&copy; {new Date().getFullYear()} Next Portfolio. Crafted with ❤️.</p>
                    <p className="font-mono">Localhost Edition</p>
                </div>

            </div>
        </section>
    );
}
