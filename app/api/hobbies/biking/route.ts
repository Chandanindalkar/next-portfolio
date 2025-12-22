import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [trips, stats] = await Promise.all([
      prisma.bikeTrip.findMany({ orderBy: { date: "desc" } }),
      prisma.bikeStats.findFirst(),
    ]);

    return NextResponse.json({ trips, stats });
  } catch {
    return NextResponse.json({ error: "Failed to fetch biking data" }, { status: 500 });
  }
}
