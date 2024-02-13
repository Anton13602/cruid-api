import { validate } from 'uuid';

export const isUuid = (value: string) => validate(value);
