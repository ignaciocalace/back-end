registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nameUser = document.getElementById("name");
  const surnameUser = document.getElementById("surname");
  const emailUser = document.getElementById("email");
  const ageUser = document.getElementById("age");
  const passwordUser = document.getElementById("password");
  const passwordCheckUser = document.getElementById("passwordCheck");
  const inputs = [
    nameUser,
    surnameUser,
    emailUser,
    ageUser,
    passwordUser,
    passwordCheckUser,
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

  if (
    instanceOfInputs &&
    valueInputs &&
    passwordUser.value === passwordCheckUser.value
  ) {
    const newUser = {
      first_name: nameUser.value,
      last_name: surnameUser.value,
      email: emailUser.value,
      age: ageUser.value,
      password: passwordUser.value,
      role: "user",
    };

    const url = "/api/register";
    const opt = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(newUser),
    };
    await send(url, opt);
  } else if (passwordUser.value != passwordCheckUser.value) {
    alert("Passwords do not match");
  }
});

async function send(url, opt) {
  await fetch(url, opt).then((res) => {
    if (res.status === 422) {
      alertPass("User alredy registred");
    } else {
      location.replace("/profile");
    }
  });
}

function alertPass(msj) {
  const span = document.createElement("span");
  span.textContent = msj;
  registerForm.appendChild(span);
}
