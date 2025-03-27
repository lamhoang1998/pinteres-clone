import { z } from "zod";

export const verifySchema = z.object({
	verificationCodes: z
		.array(
			z
				.string()
				.min(1, { message: "need to enter a number" })
				.max(1, { message: "Only one character allowed" })
		)
		.nonempty({ message: "cannot be empty" })
		.length(6, { message: "Exactly 6 codes are required" })
		.refine((codes) => codes.every((code) => code.trim() !== ""), {
			message: "All fields must be filled",
		})
		.refine((codes) => codes.every((code) => /^\d$/.test(code)), {
			message: "Only numeric values are allowed",
		}),
});

export type VerifySchema = z.infer<typeof verifySchema>;
