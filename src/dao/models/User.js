function isRole(value) {
  const validRoles = ["admin", "premium", "user"];
  return (
    validRoles.includes(value) ||
    (() => {
      throw new Error(`The value "${value}" is not a valid role.`);
    })()
  );
}

export class User {
  constructor(name, surname, email, age, password, cart, role) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.age = age;
    this.password = password;
    this.cart = cart;
    this.role = isRole(role);
  }
}
