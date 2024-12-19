import { z } from "zod";
import parsePhoneNumber, { CountryCode } from "libphonenumber-js";

export const userProfileSetupSchema = z
  .object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email().min(1, "Email is required"),
    phone_number: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    pin_code: z.string(),
    latitude: z.string(),
    longitude: z.string(),
    nation: z.string().min(1, "Nation (country code) is required"),
    profile_image: z
      .instanceof(File)
      .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
        message: "Only .jpg or .png files are accepted.",
      })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        // 5MB size limit
        message: "File size must be less than 5MB.",
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    const { phone_number, nation } = data;
    try {
      const phoneNumber = parsePhoneNumber(phone_number, {
        defaultCountry: nation as CountryCode,
      });

      if (!phoneNumber?.isValid()) {
        ctx.addIssue({
          path: ["phone_number"],
          code: z.ZodIssueCode.custom,
          message: "Invalid phone number for the selected country.",
        });
      }
    } catch (error) {
      ctx.addIssue({
        path: ["phone_number"],
        code: z.ZodIssueCode.custom,
        message: "Invalid phone number format.",
      });
    }
  });

export type UserProfileSetup = z.infer<typeof userProfileSetupSchema>;
