import { Suite } from 'vest';
import { z } from 'zod';

export type Schema =
  | z.ZodTypeAny
  | Suite<string, string, (model: any, field: string) => void>;

// Type guard for Vest suite
export const isSuite = (
  b: Schema
): b is Suite<string, string, (model: any, field: string) => void> => {
  return (
    (b as Suite<string, string, (model: any, field: string) => void>)
      .omitWhen !== undefined
  );
};
