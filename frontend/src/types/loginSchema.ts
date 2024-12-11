import { z } from "zod";
import { patterns } from "../common/pattern/pattern";

export const loginSchema = z.object({
	email: z
		.string()
		.min(1)
		.refine(
			(text) => {
				return patterns.email.test(text);
			},
			{ message: "Email is not valid" }
		),
	passWord: z.string().min(1, { message: "enter password please!" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
