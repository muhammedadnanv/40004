import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  linkedin: z.string().url("Must be a valid LinkedIn URL"),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  portfolio: z.string().url("Must be a valid URL"),
  experience: z.string().min(100, "Please provide at least 100 characters describing your experience"),
});

export type FormData = z.infer<typeof formSchema>;