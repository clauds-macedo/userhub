export interface IAddress {
  id: string;
  userId: string;
  street: string;
  city: string;
}

export class Address implements IAddress {
  id: string;
  userId: string;
  street: string;
  city: string;

  constructor(params: IAddress) {
    Object.assign(this, params);
  }

  belongsToUser(userId: string): boolean {
    return this.userId === userId;
  }
}
