async function sendToCart(event) {
  const form = event.target.closest("form");
  const quantity = form.elements.quantity.value;
  const idProduct = form.elements.idProduct.value;
  const idCart = form.elements.idCart.value;
  const url = `/api/carts/${idCart}/products/${idProduct}`;

  const opt = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({
      quantity: quantity,
    }),
  };
  await send(url, opt);
}

async function send(url, opt) {
  await fetch(url, opt)
    .then((res) => {
      console.log(res.status);
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}
