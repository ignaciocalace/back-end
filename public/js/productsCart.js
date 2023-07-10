let form;
async function sendToCart(event) {
  form = event.target.closest("form");
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
  form.reset();
  return false;
}

async function deleteProd(event) {
  form = event.target.closest("form");
  console.log(form);
  const url = `/api/products/${form.elements.deleteBtnPrd.value}`;
  const opt = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  };
  await sendDelProd(url, opt);
  return false;
}

async function send(url, opt) {
  await fetch(url, opt).then((res) => {
    if (res.status === 200) {
      alertPass("Quantity updated");
    } else if (res.status === 201) {
      alertPass("Product added to the cart");
    } else if (res.status === 403) {
      alertPass("You cant add your own product");
    } else {
      alertPass("Invalid Operation");
    }
  });
}

async function sendDelProd(url, opt) {
  const res = await fetch(url, opt);
  if (res.status === 200) {
    alertPass("Product deleted succesfully");
  } else if (res.status === 404) {
    alertPass("You cant delete this product");
  } else {
    alertPass("Error Database");
  }
}

function alertPass(msj) {
  const span = document.createElement("span");
  span.textContent = msj;
  const existingSpan = form.querySelector("span");
  existingSpan ? form.replaceChild(span, existingSpan) : form.appendChild(span);
}
