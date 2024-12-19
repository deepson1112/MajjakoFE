import { z } from "zod";

export const userSettingsSchema = z.object({
  vendor_location: z.string(),
  vendor_location_latitude: z.string(),
  vendor_location_longitude: z.string(),
});

export type UserSettings = z.infer<typeof userSettingsSchema>;
