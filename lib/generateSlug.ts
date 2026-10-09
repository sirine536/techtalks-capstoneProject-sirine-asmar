// import Community from "@/models/community";

// export async function generateUniqueSlug(name: string): Promise<string> {
//   let base = name
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9\s-]/g, "")
//     .replace(/\s+/g, "-");

//   if (!base) base = "community";

//   let slug = base;
//   let counter = 1;

//   while (await Community.exists({ slug })) {
//     slug = `${base}-${counter}`;
//     counter++;
//   }

//   return slug;
// }
import mongoose from "mongoose";

export async function generateUniqueSlug(
  model: mongoose.Model<any>,
  text: string
): Promise<string> {
  let base = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  if (!base) base = "item";

  let slug = base;
  let counter = 1;

  while (await model.exists({ slug })) {
    slug = `${base}-${counter}`;
    counter++;
  }

  return slug;
}