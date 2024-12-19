import { z } from "zod";
import parsePhoneNumber, { CountryCode } from "libphonenumber-js";

export const MAX_FILE_SIZE = 100000000;
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const userSignUpSchema = z
  .object({
    email: z.string().email({ message: "Invalid Email" }),
    first_name: z.string().min(2, "Enter a valid first name"),
    last_name: z.string().min(2, "Enter a valid last name"),
    password: z.string().min(5, "Password should have atleast 5 letters"),
    retype_password: z.string(),
    role: z.number().optional(),
    terms_conditions: z.boolean(),
  })
  .refine(
    (data) => {
      return data.password === data.retype_password;
    },
    {
      message: "Passwords do not match",
      path: ["retype_password"],
    }
  )
  .refine(
    (data) => {
      return data.terms_conditions;
    },
    {
      message: "Please agree to terms & conditions",
      path: ["terms_conditions"],
    }
  );

export const guestSignUpSchema = z.object({
  email: z.string().email(),
});

export const vendorSignUpSchema = z
  .object({
    email: z.string().email({ message: "Invalid email" }),
    first_name: z.string(),
    last_name: z.string(),
    password: z.string().min(5, "Password should be at least 5 characters."),
    restaurant_name: z.string().min(2),
    retype_password: z.string(),
    restaurant_license: z
      .any()
      .refine(
        (files) => !!files.name && files.size,
        "Resturant License is required."
      )
      .refine((files) => files?.size <= MAX_FILE_SIZE, `Max file size is 10MB.`)
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
        ".jpg, .jpeg, .png and .webp files are accepted."
      ),
  })
  .refine(
    (data) => {
      return data.password === data.retype_password;
    },
    {
      message: "Password do not match",
      path: ["retype_password"],
    }
  );

export const newPasswordSchema = z
  .object({
    password: z.string().min(5),
    retype_password: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.retype_password;
    },
    {
      message: "Password do not match",
      path: ["retype_password"],
    }
  );

export const changePasswordSchema = z
  .object({
    old_password: z.string().min(1, "Old password is required"),
    new_password: z.string().min(5),
    retype_password: z.string(),
  })
  .refine(
    (data) => {
      return data.new_password === data.retype_password;
    },
    {
      message: "Confirm Password do not match",
      path: ["retype_password"],
    }
  )
  .refine(
    (data) => {
      return data.new_password !== data.old_password;
    },
    {
      message: "New password cannot be similar to old password,",
      path: ["new_password"],
    }
  );

export const vendorAddressSchema = z.object({
  state: z.string().optional(),
  city: z.string().optional(),
  pin_code: z.string().optional(),
  country: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  address: z.string(),
  location: z.string().optional(),
  id: z.number().optional(),
});

export const billingAddressSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string().optional(),
  state: z.string(),
  city: z.string(),
  pin_code: z.string().optional(),
  country: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  address: z.string().optional(),
  location: z.string().optional(),
  id: z.number().optional(),
});

export const defaultAddressSchema = z
  .object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "last name is required"),
    phone_number: z.string(),
    state: z.string(),
    city: z.string(),
    pin_code: z.string().optional(),
    country: z.string(),
    latitude: z.string(),
    longitude: z.string(),
    location: z.string(),
    address: z.string().min(3, "Address is required"),
    id: z.number().optional(),
    email: z.string().optional(),
    nation: z.string().min(1, "Nation (country code) is required"),
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

export const defaultEditAddressSchema = z.object({
  first_name: z.string().min(2, { message: "First Name is Required" }),
  last_name: z.string().min(2, { message: "Last Name is Required" }),
  phone_number: z.string(),
  state: z.string().min(3, { message: "State is Required." }),
  city: z.string().min(3, { message: "City is Required." }),
  pin_code: z.string().optional(),
  country: z.string().min(2, { message: "Country is Required" }),
  latitude: z.string().min(1, { message: "Country is Required" }),
  longitude: z.string().min(1, { message: "Country is Required" }),
  address: z.string().min(3, { message: "Address is Required" }),
  id: z.number().optional(),
  email: z.string().email().optional(),
});
export const orderAddressSchema = z.object({
  default_address: defaultAddressSchema,
  billing_address: z.array(billingAddressSchema),
});

export const VerifyOtpSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export type VerifyOtpType = z.infer<typeof VerifyOtpSchema>;
export type DeliveryAddressType = z.infer<typeof defaultAddressSchema>;
export type BillingAddressType = z.infer<typeof billingAddressSchema>;
export type NewPasswordType = z.infer<typeof newPasswordSchema>;
export type ChangePasswordType = z.infer<typeof changePasswordSchema>;
export type OrderAddressType = z.infer<typeof orderAddressSchema>;
export type VendorAddressType = z.infer<typeof vendorAddressSchema>;
export type UserSignUp = z.infer<typeof userSignUpSchema>;
export type VendorSignUp = z.infer<typeof vendorSignUpSchema>;
export type Guest = z.infer<typeof guestSignUpSchema>;
