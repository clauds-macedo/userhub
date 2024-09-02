export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public createdAt: Date,
    public addresses: any[] = []
  ) {}

  addAddress(address: any): void {
    this.addresses.push(address);
  }
}
