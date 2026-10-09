import User from "@/models/user";

export async function generateUniqueUsername(baseName: string): Promise<string> {
  // Clean the base name: lowercase, remove special chars, replace spaces with dashes
  let base = baseName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  if (!base) base = "user"; // fallback if name produces empty string

  let username = base;
  let counter = 1;

  // Keep checking until we find a username that doesn't exist yet
  while (await User.exists({ username })) {
    username = `${base}-${counter}`;
    counter++;
  }

  return username;
}