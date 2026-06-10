import { z } from "zod";
import { requiredString } from "./common";

export const createOrganizationSchema = z.object({
  name: requiredString.min(2).max(100),
  currency: z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === "" ? undefined : value,
    z.string().trim().default("EUR"),
  ),
});

export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>;
