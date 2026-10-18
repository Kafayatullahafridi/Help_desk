import { z } from "zod";

const requiredText = (label, max = 200) => z.string({ required_error: `${label} is required.` }).trim().min(1, `${label} is required.`).max(max);

export const registerSchema = z.object({
  name: requiredText("Name", 100),
  email: z.string().email("A valid email is required.").toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters.").max(100),
});
export const loginSchema = z.object({ email: z.string().email("A valid email is required.").toLowerCase(), password: z.string().min(1, "Password is required.") });
export const ticketSchema = z.object({
  title: requiredText("Title", 180),
  description: requiredText("Description", 10000),
  category: requiredText("Category", 80),
  priority: z.enum(["Low", "Medium", "High", "Critical"]).default("Medium"),
});
export const commentSchema = z.object({ body: requiredText("Comment", 10000), isInternal: z.boolean().default(false) });
export const statusSchema = z.object({ status: z.enum(["Open", "In progress", "Waiting for user", "Resolved", "Closed"]), resolution: z.string().max(5000).optional() });
export const assignmentSchema = z.object({ assigneeId: z.string().min(1, "Assignee is required.") });
