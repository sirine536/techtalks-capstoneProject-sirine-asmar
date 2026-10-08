import { z } from "zod";

export const updateProfileSchema = z.object({
  bio: z.string().max(300, "Bio must be under 300 characters").optional(),
  skills: z.array(z.string()).max(15, "Maximum 15 skills").optional(),
});