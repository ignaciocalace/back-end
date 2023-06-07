createProductForm = document.getElementById("createProductForm");

createProductForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const titleProduct = document.getElementById("title");
  const descriptionProduct = document.getElementById("description");
  const codeProduct = document.getElementById("code");
  const priceProduct = document.getElementById("price");
  const statusProduct = document.getElementById("status");
  const stockProduct = document.getElementById("stock");
  const categoryProduct = document.getElementById("category");
  const thumbnailsProduct = document.getElementById("thumbnails");
  const inputs = [
    titleProduct,
    descriptionProduct,
    codeProduct,
    priceProduct,
    stockProduct,
    categoryProduct,
  ];
  let instanceOfInputs = true;
  let valueInputs = true;

  for (const input of inputs) {
    if (!(input instanceof HTMLInputElement)) {
      instanceOfInputs = false;
      break;
    }
  }

  for (const input of inputs) {
    if (!input.value) {
      valueInputs = false;
      break;
    }
  }

  if (instanceOfInputs && valueInputs) {
    const newProduct = {
      title: titleProduct.value,
      description: descriptionProduct.value,
      code: codeProduct.value,
      price: priceProduct.value,
      status: statusProduct.value,
      stock: stockProduct.value,
      category: categoryProduct.value,
      thumbnails: thumbnailsProduct.value,
    };

    const url = "/api/products";
    const opt = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(newProduct),
    };
    await send(url, opt);
  }
});

async function send(url, opt) {
  await fetch(url, opt).then((res) => {
    if (res.status === 201) {
      alertPass("Product added succesfully");
    } else if (res.status === 200) {
      alertPass("Code product alredy added");
    } else {
      alertPass("Error Database");
    }
  });
}

function alertPass(msj) {
  const span = document.createElement("span");
  span.textContent = msj;
  const existingSpan = form.querySelector("span");
  existingSpan ? form.replaceChild(span, existingSpan) : form.appendChild(span);
}
