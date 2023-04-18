loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailUser = document.getElementById("email");
  const passwordUser = document.getElementById("password");

  const inputs = [emailUser, passwordUser];

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
    const loginUser = {
      email: emailUser.value,
      password: passwordUser.value,
    };

    const url = "/api/login";
    const opt = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(loginUser),
    };
    await send(url, opt);
  }
});

async function send(url, opt) {
  await fetch(url, opt)
    .then((res) => {
      console.log(res.status);
      if (res.status === 500) {
        alertPass("Wrong Credentials");
      } else if (res.status === 200) {
        window.location.href = "/";
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function alertPass(msj) {
  const span = document.createElement("span");
  span.textContent = msj;
  loginForm.appendChild(span);
}
