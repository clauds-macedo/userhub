import { IAddress } from '@/domain/entities/Address';

export const generateFakeAddress = (): IAddress => {
  return {
    id: Math.floor(Math.random() * 1000),
    userId: 1,
    street: `Fake Street ${Math.floor(Math.random() * 100)}`,
    city: 'Faketown',
  };
};
