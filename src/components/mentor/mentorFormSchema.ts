import * as z from "zod";

export const mentorFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  github: z.string().url("Must be a valid GitHub URL"),
  linkedin: z.string().url("Must be a valid LinkedIn URL"),
  codepen: z.string().url("Must be a valid CodePen URL"),
  program: z.enum(["5-week", "10-week"], { required_error: "Please select a program" }),
});

export type MentorFormData = z.infer<typeof mentorFormSchema>;