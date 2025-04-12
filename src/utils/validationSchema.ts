import { z } from "zod";

export const adminLoginSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type AdminLoginSchema = z.infer<typeof adminLoginSchema>;