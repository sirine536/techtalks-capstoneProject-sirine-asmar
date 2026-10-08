import { z } from "zod";

export const createCommunitySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(50),
  description: z.string().min(10, "Description must be at least 10 characters").max(500),
  topics: z.array(z.string()).max(10, "Maximum 10 topics").default([]),
});

export type CreateCommunityInput = z.infer<typeof createCommunitySchema>;