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

    const url = "/api/sessions";
    const opt = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(loginUser),
    };
    await send(url, opt);
    window.location.href = "/";
  }
});

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
