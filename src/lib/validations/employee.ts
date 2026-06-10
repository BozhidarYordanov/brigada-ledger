import { z } from "zod";
import { moneyAmount, optionalString, requiredString } from "./common";

export const createEmployeeSchema = z.object({
  fullName: requiredString.min(2).max(100),
  phone: optionalString.refine(
    (value) => value === undefined || value.length <= 30,
  ),
  defaultDailyWage: moneyAmount,
  notes: optionalString.refine(
    (value) => value === undefined || value.length <= 1000,
  ),
});

export const updateEmployeeSchema = createEmployeeSchema;

export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeInput = z.infer<typeof updateEmployeeSchema>;
