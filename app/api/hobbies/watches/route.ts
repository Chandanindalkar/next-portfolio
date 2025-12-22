import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const watches = await prisma.watch.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(watches);
  } catch {
    return NextResponse.json({ error: "Failed to fetch watches" }, { status: 500 });
  }
}
