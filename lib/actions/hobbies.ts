"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- Bike Stats ---
export async function updateBikeStats(formData: FormData) {
  const totalKm = parseFloat(formData.get("totalKm") as string);
  const bikesOwned = parseInt(formData.get("bikesOwned") as string);
  const tripsCompleted = parseInt(formData.get("tripsCompleted") as string);

  const stats = await prisma.bikeStats.findFirst();

  if (stats) {
    await prisma.bikeStats.update({
      where: { id: stats.id },
      data: { totalKm, bikesOwned, tripsCompleted },
    });
  } else {
    await prisma.bikeStats.create({
      data: { totalKm, bikesOwned, tripsCompleted },
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/hobbies");
}

// --- Bike Trips ---
export async function createBikeTrip(formData: FormData) {
  const location = formData.get("location") as string;
  const latitude = parseFloat(formData.get("latitude") as string);
  const longitude = parseFloat(formData.get("longitude") as string);
  const date = new Date(formData.get("date") as string);
  const distance = parseFloat(formData.get("distance") as string);
  const description = formData.get("description") as string;

  await prisma.bikeTrip.create({
    data: {
      location,
      latitude,
      longitude,
      date,
      distance,
      description,
      imageUrls: [], // Placeholder
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/hobbies");
}

// --- Bike Maintenance ---
export async function createMaintenanceLog(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const date = new Date(formData.get("date") as string);

  await prisma.bikeMaintenance.create({
    data: {
      title,
      description,
      date,
      beforeImages: [],
      afterImages: [],
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/hobbies");
}

// --- Watches ---
export async function createWatch(formData: FormData) {
  const brand = formData.get("brand") as string;
  const model = formData.get("model") as string;
  const movement = formData.get("movement") as string;
  const year = parseInt(formData.get("year") as string);
  const order = parseInt(formData.get("order") as string) || 0;

  await prisma.watch.create({
    data: {
      brand,
      model,
      movement,
      year,
      order,
      imageUrls: [],
      specs: {},
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/hobbies");
}

// --- Custom Builds ---
export async function createCustomBuild(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  await prisma.customBuild.create({
    data: {
      title,
      description,
      specs: {},
      imageUrls: [],
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/hobbies");
}

// --- Deletion Helpers ---
export async function deleteHobbyItem(type: string, id: string) {
  switch (type) {
    case "trip": await prisma.bikeTrip.delete({ where: { id } }); break;
    case "maintenance": await prisma.bikeMaintenance.delete({ where: { id } }); break;
    case "watch": await prisma.watch.delete({ where: { id } }); break;
    case "build": await prisma.customBuild.delete({ where: { id } }); break;
  }
  revalidatePath("/");
  revalidatePath("/admin/hobbies");
}
