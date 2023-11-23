import { lastValueFrom, take } from 'rxjs';
import { z } from 'zod';
import { ContactService } from '../../services/contact.service';
import { requiredFormField } from './zod-general.validation';
import { addressZodSchema } from './simple-form-zod.validation';

export const createAsyncZodSchema = (service: ContactService) => {
  return z.object({
    firstName: requiredFormField,
    lastName: requiredFormField,
    nickName: z.string().refine(
      async (value) => {
        const nickNameTaken = await lastValueFrom(
          service.isNickNameTaken().pipe(take(1))
        );
        if (!nickNameTaken) {
          return Promise.resolve(value);
        }
        return Promise.resolve(false);
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
