import { z } from "zod";

export const hotelSchema = z.object({
	imgName: z.string().min(1, "Image name is required"),
	description: z.string().min(1, "Description is required"),
	img: z
		.any() // Allow any input type initially
		.refine(
			(files) => files instanceof FileList && files.length > 0,
			"Image is required"
		)
		.refine(
			(files) => files[0] instanceof File && files[0].size > 0,
			"Invalid file"
		),
});

export type HotelSchema = z.infer<typeof hotelSchema>;
