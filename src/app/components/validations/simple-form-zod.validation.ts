import { lastValueFrom } from 'rxjs';
import { ContactService } from '../../services/contact.service';
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

export const createAsyncZodSchema = (service: ContactService) => {
  return z.object({
    firstName: requiredFormField,
    lastName: requiredFormField,
    nickName: z.string().refine(
      async (value) => {
        const nickNameTaken = await lastValueFrom(service.isNickNameTaken());
        if (!nickNameTaken) {
          return false;
        }
        return value;
      },
      { message: 'Nick name taken!!' }
    ),
    addresses: z
      .object({
        homeAddress: addressZodSchema,
        workAddress: addressZodSchema.optional(),
        includeWorkAddress: z.boolean().nullish(),
      })
      .optional(),
  });
};

export const simpleAsyncZodSchema = z.object({
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
