export class UserModel {
  name: string;
  ifLoggedIn = false;
  role: string;

  constructor(name: string, ifLoggedIn: boolean, role: string) {
    this.name = name;
    this.ifLoggedIn = ifLoggedIn;
    this.role = role;
  }

}
