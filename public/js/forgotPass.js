form = document.getElementById("Form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const emailUser = document.getElementById("email");
  const url = "/api/recoverPass";
  const opt = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email: emailUser.value,
    }),
  };
  await send(url, opt);
});

async function send(url, opt) {
  await fetch(url, opt).then((res) => {
    alertPass("Email Sent");
  });
}

function alertPass(msj) {
  const span = document.createElement("span");
  span.textContent = msj;
  const existingSpan = form.querySelector("span");
  existingSpan ? form.replaceChild(span, existingSpan) : form.appendChild(span);
}
