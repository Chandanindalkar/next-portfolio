import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email and message are required" }, { status: 400 });
    }

    // Rate limiting: Check for recent submissions from same email (5 mins)
    const recentSubmission = await prisma.contact.findFirst({
      where: {
        email,
        createdAt: {
          gte: new Date(Date.now() - 5 * 60 * 1000),
        },
      },
    });

    if (recentSubmission) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait a few minutes." },
        { status: 429 }
      );
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    return NextResponse.json({ success: true, id: contact.id });
  } catch (error) {
    console.error("Error creating contact submission:", error);
    return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 });
  }
}
