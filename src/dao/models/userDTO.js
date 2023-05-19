class UserDTO {
  constructor({ _id, first_name, last_name, email, age, cart, role }) {
    this.id = _id;
    this.name = first_name + " " + last_name;
    this.email = email;
    this.age = age;
    this.cart = cart;
    this.role = role;
  }
  returnUser() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      age: this.age,
      cart: this.cart,
      role: this.role,
    };
  }
}
export default UserDTO;
