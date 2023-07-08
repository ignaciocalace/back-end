class UserDTO {
  constructor({
    _id,
    first_name,
    last_name,
    email,
    age,
    cart,
    role,
    documents,
    last_connection,
  }) {
    this.id = _id;
    this.name = first_name + " " + last_name;
    this.email = email;
    this.age = age;
    this.cart = cart;
    this.role = role;
    this.documents = documents;
    this.last_connection = last_connection;
  }
  returnUser() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      age: this.age,
      cart: this.cart,
      role: this.role,
      documents: this.documents,
      last_connection: this.last_connection,
    };
  }
}
export default UserDTO;
