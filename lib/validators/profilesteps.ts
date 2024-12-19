import { number, string, z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "./user";
const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
});
export const profileSchema = z.object({
  cover_image: z
    .any()
    .refine((files) => files?.size <= MAX_FILE_SIZE, `Max file size is 10MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  profile_image: z
    .any()
    .refine((files) => files?.size <= MAX_FILE_SIZE, `Max file size is 10MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  profile_image_url: z.any().optional(),
  cover_image_url: z.any().optional(),
  vendor_location: z
    .string()
    .min(1, { message: "Vendor Location is required!!" }),
  phone: z.string().min(4, "Phone number is required"),
  description: z.string().optional(),
  vendor_name: z.string().min(1, "Company/Restaurant Name is required!!"),
  vendor_location_latitude: z.string(),
  vendor_location_longitude: z.string(),
  vendor_city: z.string(),
  vendor_pin_code: z.string().optional(),
  role: z.string().min(1, { message: "Vendor Role is required!!" }),
  offerings: z.array(string()).optional(),
  is_retail: z.boolean().default(false).optional(),
  is_resuturant: z.boolean().default(false).optional(),
  place_id: z.string(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
// import { z } from "zod";
// import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "./user";
// const optionSchema = z.object({
//   label: z.string(),
//   value: z.string(),
// });
// export const profileSchema = z.object({
//   cover_image: z
//     .any()
//     .refine((files) => files?.size <= MAX_FILE_SIZE, `Max file size is 10MB.`)
//     .refine(
//       (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
//       ".jpg, .jpeg, .png and .webp files are accepted."
//     ),
//   profile_image: z
//     .any()
//     .refine((files) => files?.size <= MAX_FILE_SIZE, `Max file size is 10MB.`)
//     .refine(
//       (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
//       ".jpg, .jpeg, .png and .webp files are accepted."
//     ),
//   vendor_location: z.string(),
//   phone: z.number().optional(),
//   description: z.string().optional(),
//   res_name: z.string().optional(),
//   vendor_location_latitude: z.string().optional(),
//   vendor_location_longitude: z.string().optional(),
//   vendor_city: z.string().optional(),
//   vendor_pin_code: z.string().optional(),
//   role: z.string().optional(),
//   offerings: z.array(optionSchema).optional(),
// });

// export type ProfileSchema = z.infer<typeof profileSchema>;
