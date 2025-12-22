import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const builds = await prisma.customBuild.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(builds);
  } catch {
    return NextResponse.json({ error: "Failed to fetch builds" }, { status: 500 });
  }
}
