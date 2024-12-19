import { z } from "zod";

export const FormDataSchema = z.object({
  email: z.string().min(1, "Name is required."),
  password: z.string().min(1, "Message is required"),
});

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

export type NewPasswordType = z.infer<typeof newPasswordSchema>;
