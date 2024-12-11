import { z } from "zod";
import { patterns } from "../common/pattern/pattern";

export const registerSchema = z.object({
	fullName: z.string().min(3, { message: "please enter more than 3 letters" }),
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

export type RegisterSchema = z.infer<typeof registerSchema>;
