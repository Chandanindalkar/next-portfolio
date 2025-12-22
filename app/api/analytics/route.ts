import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const headerList = await headers();
    
    const userAgent = headerList.get("user-agent") || "unknown";
    const referrer = headerList.get("referer") || "direct";
    // IP and location tracking would ideally use headers like x-forwarded-for 
    // but for local testing we'll keep it simple
    
    const event = await prisma.analytics.create({
      data: {
        eventType: data.eventType,
        eventData: data.eventData || {},
        sessionId: data.sessionId,
        browser: userAgent.split(" ")[0], // Crude extraction
        device: userAgent.includes("Mobi") ? "mobile" : "desktop",
        referrer: referrer,
        // IP and Country placeholders for local dev
      },
    });

    return NextResponse.json({ success: true, id: event.id });
  } catch (error) {
    console.error("Error storing analytic event:", error);
    return NextResponse.json({ error: "Failed to store event" }, { status: 500 });
  }
}
