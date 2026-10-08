import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(150),
  content: z.string().min(20, "Content must be at least 20 characters"),
  communityId: z.string().min(1, "Community is required"),
  tags: z.array(z.string()).max(5, "Maximum 5 tags").default([]),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;