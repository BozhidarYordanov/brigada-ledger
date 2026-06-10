import { z } from "zod";

function emptyStringToUndefined(value: unknown) {
  if (typeof value === "string" && value.trim() === "") {
    return undefined;
  }

  return value;
}

export const requiredString = z.string().trim().min(1);

export const optionalString = z.preprocess(
  emptyStringToUndefined,
  z.string().trim().optional(),
);

export const moneyAmount = z.preprocess((value) => {
  const normalizedValue = emptyStringToUndefined(value);

  if (typeof normalizedValue === "string") {
    return normalizedValue.replace(",", ".");
  }

  return normalizedValue;
}, z.coerce.number().positive().optional());

export const uuidSchema = z.string().uuid();
