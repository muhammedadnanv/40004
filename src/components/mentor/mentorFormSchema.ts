import * as z from "zod";

export const mentorFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  expertise: z.string().min(2, "Please specify your area of expertise"),
  experience: z.string().min(1, "Please specify your years of experience"),
  linkedin: z.string().url("Must be a valid LinkedIn URL"),
  github: z.string().url("Must be a valid GitHub URL"),
  portfolio: z.string().url("Must be a valid portfolio URL"),
  motivation: z.string().min(100, "Please provide at least 100 characters describing your motivation"),
});

export type MentorFormData = z.infer<typeof mentorFormSchema>;