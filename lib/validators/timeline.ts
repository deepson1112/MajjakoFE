import * as z from "zod";

export const timelineSchema = z.object({
  hour_name: z.string().min(1, "Timeline name is required!"),
  starting_hours: z.string(),
  ending_hours: z.string(),
  week_days: z.array(z.number()).min(1, "At least one day must be selected"),
});
