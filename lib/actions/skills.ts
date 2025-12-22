"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSkill(formData: FormData) {
  try {
    const skill = await prisma.skill.create({
      data: {
        name: formData.get("name") as string,
        startDate: new Date(formData.get("startDate") as string),
        category: formData.get("category") as string,
      },
    });
    revalidatePath("/admin/skills");
    revalidatePath("/api/skills");
    return { success: true, skill };
  } catch (error) {
    console.error("Error creating skill:", error);
    return { error: "Failed to create skill" };
  }
}

export async function deleteSkill(id: string) {
  try {
    await prisma.skill.delete({
      where: { id },
    });
    revalidatePath("/admin/skills");
    revalidatePath("/api/skills");
    return { success: true };
  } catch (error) {
    console.error("Error deleting skill:", error);
    return { error: "Failed to delete skill" };
  }
}
