"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProject(formData: FormData) {
  try {
    const project = await prisma.project.create({
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        techStack: (formData.get("techStack") as string).split(",").map((s: string) => s.trim()),
        role: (formData.get("role") as string) || "Developer",
        contributions: (formData.get("contributions") as string) || "",
        imageUrls: [formData.get("imageUrl") as string],
        order: parseInt(formData.get("order") as string) || 0,
      },
    });
    revalidatePath("/admin/projects");
    revalidatePath("/#projects");
    return { success: true, project };
  } catch (error) {
    console.error("Error creating project:", error);
    return { error: "Failed to create project" };
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id },
    });
    revalidatePath("/admin/projects");
    revalidatePath("/#projects");
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { error: "Failed to delete project" };
  }
}

export async function updateProject(id: string, formData: FormData) {
  try {
    const project = await prisma.project.update({
      where: { id },
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        techStack: (formData.get("techStack") as string).split(",").map((s: string) => s.trim()),
        role: formData.get("role") as string,
        contributions: formData.get("contributions") as string,
        imageUrls: [formData.get("imageUrl") as string],
        order: parseInt(formData.get("order") as string),
      },
    });
    revalidatePath("/admin/projects");
    revalidatePath("/#projects");
    return { success: true, project };
  } catch (error) {
    console.error("Error updating project:", error);
    return { error: "Failed to update project" };
  }
}
