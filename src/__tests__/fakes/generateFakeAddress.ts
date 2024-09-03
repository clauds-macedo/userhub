import { IAddress } from '@/domain/entities/Address';
import { randomUUID } from 'crypto';

export const generateFakeAddress = (): IAddress => {
  return {
    id: randomUUID(),
    userId: randomUUID(),
    street: `Fake Street ${Math.floor(Math.random() * 100)}`,
    city: 'Faketown',
  };
};
