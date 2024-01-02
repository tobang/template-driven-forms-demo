import { z } from 'zod';

export const requiredFormField = z
  .custom<any>()
  .refine((value) => value ?? false, 'Field is required');
