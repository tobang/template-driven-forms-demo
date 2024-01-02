import { z } from 'zod';

const requiredFormField = z
  .custom<any>()
  .refine((value) => value ?? false, 'Field is required');

export const addressZodSchema = z.object({
  street: requiredFormField,
  city: requiredFormField,
  zipcode: requiredFormField.pipe(
    z.string().regex(/^\d{4}$/, {
      message: 'Not a valid postal code',
    })
  ),
});

export const simpleZodSchema = z.object({
  firstName: requiredFormField,
  lastName: requiredFormField,
  addresses: z
    .object({
      homeAddress: addressZodSchema,
      workAddress: addressZodSchema.optional(),
      includeWorkAddress: z.boolean().nullish(),
    })
    .optional(),
});
