import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config";
import bcrypt from "bcryptjs";

const url = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?schema=public`;
const pool = new pg.Pool({ connectionString: url });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.user.deleteMany();
  await prisma.project.deleteMany();
  await prisma.skill.deleteMany();

  // Seed Admin User
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: hashedPassword,
    },
  });

  // Seed Skills
  const skills = [
    { name: "TypeScript", startDate: new Date("2021-01-01"), category: "Languages" },
    { name: "JavaScript", startDate: new Date("2019-06-01"), category: "Languages" },
    { name: "Python", startDate: new Date("2020-01-01"), category: "Languages" },
    { name: "HTML/CSS", startDate: new Date("2018-01-01"), category: "Languages" },
    { name: "React", startDate: new Date("2020-03-01"), category: "Frontend" },
    { name: "Next.js", startDate: new Date("2021-06-01"), category: "Frontend" },
    { name: "Tailwind CSS", startDate: new Date("2021-01-01"), category: "Frontend" },
    { name: "GSAP", startDate: new Date("2022-01-01"), category: "Frontend" },
    { name: "Redux", startDate: new Date("2020-06-01"), category: "Frontend" },
    { name: "Node.js", startDate: new Date("2020-06-01"), category: "Backend" },
    { name: "PostgreSQL", startDate: new Date("2021-01-01"), category: "Backend" },
    { name: "Prisma", startDate: new Date("2021-06-01"), category: "Backend" },
    { name: "GraphQL", startDate: new Date("2022-01-01"), category: "Backend" },
    { name: "Git", startDate: new Date("2019-01-01"), category: "Tools" },
    { name: "Docker", startDate: new Date("2021-01-01"), category: "Tools" },
    { name: "Figma", startDate: new Date("2020-01-01"), category: "Tools" },
    { name: "VS Code", startDate: new Date("2018-01-01"), category: "Tools" },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }

  // Seed Projects
  const projects = [
    {
      title: "Project Alpha",
      description: "A futuristic dashboard built with Next.js and Tremor. Features real-time data visualization and dark mode.",
      techStack: ["Next.js", "TypeScript", "Tailwind", "Tremor"],
      role: "Lead Developer",
      contributions: "Architected the dashboard and implemented real-time data fetching logic.",
      imageUrls: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"],
      order: 1,
    },
    {
      title: "Neon Commerce",
      description: "High-performance e-commerce template with headless CMS integration and stripe payments.",
      techStack: ["React", "Shopify", "GSAP", "Stripe"],
      role: "Frontend Developer",
      contributions: "Developed the shopping cart and checkout flow with stripe integration.",
      imageUrls: ["https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop"],
      order: 2,
    },
    {
      title: "AI Chat Interface",
      description: "Clean, minimal chat interface for LLMs. Supports streaming responses and markdown rendering.",
      techStack: ["Svelte", "Node.js", "OpenAI", "WebSockets"],
      role: "Fullstack Developer",
      contributions: "Implemented the streaming API and the markdown renderer.",
      imageUrls: ["https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"],
      order: 3,
    },
    {
      title: "Portfolio v1",
      description: "My previous portfolio site. Focused on typography and brutalist design aesthetics.",
      techStack: ["HTML/SCSS", "JavaScript", "WebGL"],
      role: "Designer & Developer",
      contributions: "Designed the brutalist aesthetic and implemented custom WebGL shaders.",
      imageUrls: ["https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop"],
      order: 4,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
