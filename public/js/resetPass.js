form = document.getElementById("Form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const path = window.location.pathname;
  const tokenPass = path.substring(path.lastIndexOf("/") + 1);
  const passwordUser = document.getElementById("password");
  const passwordCheckUser = document.getElementById("passwordCheck");
  const inputs = [passwordUser, passwordCheckUser];
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

  if (
    instanceOfInputs &&
    valueInputs &&
    passwordUser.value === passwordCheckUser.value
  ) {
    const newUser = {
      token: tokenPass,
      password: passwordUser.value,
    };

    const url = "/api/users/updatePass";
    const opt = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(newUser),
    };
    await send(url, opt);
  } else if (passwordUser.value != passwordCheckUser.value) {
    alertPass("Passwords do not match");
  }
});

async function send(url, opt) {
  await fetch(url, opt).then((res) => {
    if (res.status === 400) {
      alertPass("The password cannot be the currently used");
    } else if (res.status === 201) {
      alertPass("Password changed");
    }
  });
}

function alertPass(msj) {
  const span = document.createElement("span");
  span.textContent = msj;
  const existingSpan = form.querySelector("span");
  existingSpan ? form.replaceChild(span, existingSpan) : form.appendChild(span);
}
