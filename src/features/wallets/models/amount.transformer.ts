import { ValueTransformer } from 'typeorm';

export const integerAmountTransformer: ValueTransformer = {
  to(value: number): number {
    return value;
  },
  from(value: string | number): number {
    return Number(value);
  },
};
