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
  constructor(
    name,
    surname,
    email,
    age,
    password,
    cart,
    role,
    documents = [],
    last_connection = new Date()
  ) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.age = age;
    this.password = password;
    this.cart = cart;
    this.role = isRole(role);
    this.documents = documents;
    this.last_connection = last_connection;
  }
}
