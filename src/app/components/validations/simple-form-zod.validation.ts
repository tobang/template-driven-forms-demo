import { z } from 'zod';

const required = { message: 'Field is required' };

export const addressZodSchema = z.object({
  street: z.string().min(1, { message: 'Field is required' }).optional(),
  city: z.string().min(1, { message: 'Field is required' }),
  zipcode: z
    .string()
    .min(1, { message: 'Field is required' })
    .regex(/^\d{4}$/, { message: 'Not a valid postal code' }),
});

const addressSchema = z.discriminatedUnion('includeWorkAddress', [
  addressZodSchema.extend({ includeWorkAddress: z.literal(true) }),
  addressZodSchema.partial().extend({ includeWorkAddress: z.literal(false) }),
]);

export const simpleZodSchema = z.object({
  firstName: z.string().min(1, { message: 'Field is required' }).optional(),
  lastName: z.string().min(1, { message: 'Field is required' }),
  addresses: z
    .object({
      homeAddress: addressZodSchema.optional(),
      workAddress: addressZodSchema.optional(),
      includeWorkAddress: z.boolean().nullish(),
    })
    .optional(),
});

type addressType = z.infer<typeof addressZodSchema>;

type test = z.infer<typeof simpleZodSchema>;
