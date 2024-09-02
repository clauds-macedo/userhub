export interface IAddress {
  id: number;
  userId: number;
  street: string;
  city: string;
}

export class Address implements IAddress {
  id: number;
  userId: number;
  street: string;
  city: string;

  constructor(params: IAddress) {
    Object.assign(this, params);
  }
}
