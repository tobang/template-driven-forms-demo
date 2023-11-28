import { lastValueFrom, take } from 'rxjs';
import { z } from 'zod';
import { SignupService } from '../../services/signup.service';
import { requiredFormField } from './zod-utils.validation';
import { addressZodSchema } from './signup-form-zod.validation';

export const createAsyncZodSchema = (service: SignupService) => {
  return z.object({
    firstName: requiredFormField,
    lastName: requiredFormField,
    userName: z.string().refine(
      async (value) => {
        const userNameTaken = await lastValueFrom(
          service.isUserNameTaken().pipe(take(1))
        );
        if (!userNameTaken) {
          return Promise.resolve(value);
        }
        return Promise.resolve(false);
      },
      { message: 'User name taken!!' }
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
