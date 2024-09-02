import { IAddress } from './Address';

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  addresses?: IAddress[];
}

export class User implements IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  addresses?: IAddress[];

  constructor(params: IUser) {
    Object.assign(this, params);
  }

  addAddress(address: IAddress): void {
    this.addresses?.push(address);
  }
}
