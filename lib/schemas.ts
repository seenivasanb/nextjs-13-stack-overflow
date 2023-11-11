import * as z from "zod";

export const questionSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(5, "Title must be at least 5 characters")
    .max(130, "Title must be maximum 130 characters"),
  explanation: z
    .string({ required_error: "Explanation is required" })
    .min(100, "Explanation must be at least 100 characters"),
  tags: z
    .array(z.string().min(1).max(15), {
      required_error: "Must have at least 1 tag",
    })
    .min(1)
    .max(3),
});

export const AnswerSchema = z.object({
  answer: z.string().min(100),
});
