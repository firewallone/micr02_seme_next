"use server";

import { redirect } from "next/navigation";
import prisma from "./prismaClient";

export const createCar = async (formData: FormData) => {
  const modelId = formData.get("modelId")?.toString();
  const brandId = formData.get("brandId")?.toString();
  const description = formData.get("description")?.toString();
  const location = formData.get("location")?.toString();
  const price = Number(formData.get("price")?.toString());
  const color = formData.get("color")?.toString();
  const year = Number(formData.get("year")?.toString());

  if (!modelId || !brandId || !description) {
    return;
  }

  await prisma.car.create({
    data: {
      modelId: modelId,
      brandId: brandId,
      description: description,
      location: location,
      price: price,
      color: color,
      year: year,
    },
  });

  redirect("/");
};
