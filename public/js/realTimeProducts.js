const socket = io();

document.getElementById("btnSubmit")?.addEventListener("click", () => {
  const inputTitle = document.getElementById("inputTitle");
  const inputDescription = document.getElementById("inputDescription");
  const inputCode = document.getElementById("inputCode");
  const inputPrice = document.getElementById("inputPrice");
  const inputStatus = document.getElementById("inputStatus");
  const inputCategory = document.getElementById("inputCategory");
  const inputStock = document.getElementById("inputStock");
  const inputThumbnails = document.getElementById("inputThumbnails");
  const inputs = [
    inputTitle,
    inputDescription,
    inputCode,
    inputPrice,
    inputStatus,
    inputCategory,
    inputStock,
    inputThumbnails,
  ];

  let instanceOfInputs = true;
  let valueInputs = true;

  for (const input of inputs) {
    if (!(input instanceof HTMLInputElement)) {
      console.log(input);
      if (input != inputThumbnails || input != inputStatus) {
        instanceOfInputs = false;
        break;
      }
    }
  }

  for (const input of inputs) {
    if (input.id != "inputThumbnails") {
      if (input.id != "inputStatus") {
        if (!input.value) {
          valueInputs = false;
          break;
        }
      } else {
        inputStatus.value = true;
      }
    }
  }

  if (instanceOfInputs && valueInputs) {
    const product = {
      title: inputTitle.value,
      description: inputDescription.value,
      code: inputCode.value,
      price: inputPrice.value,
      status: inputStatus.value,
      category: inputCategory.value,
      stock: inputStock.value,
      thumbnails: inputThumbnails.value,
    };
    socket.emit("newProduct", product);
  }
});

socket.on("refreshProducts", (products) => {
  const productsDiv = document.querySelector("#products");

  if (products) {
    productsDiv.innerHTML = ``;
    products.forEach((element) => {
      productsDiv.innerHTML += `
  <div>
     <ul>

      <li>Title: ${element.title}</li>
      <li>Description: ${element.description}</li>
      <li>Code: ${element.code}</li>
      <li>Price: ${element.price}</li>
      <li>Status: ${element.status}</li>
      <li>Category: ${element.category}</li>
      <li>Stock: ${element.stock}</li>
      <li>Thumbnails: ${element.thumbnails}</li>

    </ul>
  </div>`;
    });
  }
});

socket.emit("updateProducts");
