import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const logs = await prisma.bikeMaintenance.findMany({
      orderBy: { date: "desc" },
    });
    return NextResponse.json(logs);
  } catch {
    return NextResponse.json({ error: "Failed to fetch maintenance logs" }, { status: 500 });
  }
}
