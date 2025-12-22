import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const skills = await prisma.skill.findMany();
    
    // Group by category as per SKILLS_DATA structure
    const groupedSkills = skills.reduce((acc: Record<string, { category: string; items: { name: string; startDate: string }[] }>, skill) => {
      const category = skill.category || "Misc";
      if (!acc[category]) {
        acc[category] = { category, items: [] };
      }
      acc[category].items.push({
        name: skill.name,
        startDate: skill.startDate.toISOString().split('T')[0],
      });
      return acc;
    }, {});

    return NextResponse.json(Object.values(groupedSkills));
  } catch (error) {
    console.error("Error fetching skills:", error);
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}
