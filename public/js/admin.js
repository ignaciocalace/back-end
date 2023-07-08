let form;
async function deleteAllInactives(event) {
  form = event.target.closest("form");
  const url = `/api/users`;
  const opt = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  };
  await sendDeleteInactives(url, opt);
  return false;
}
async function changeRole(event) {
  form = event.target.closest("form");
  const email = form.elements.changeRoleBtnUser.value;
  const url = `/api/users/premium/${email}`;
  const opt = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
  };
  await send(url, opt);
  return false;
}
async function deleteUser(event) {
  form = event.target.closest("form");
  const email = form.elements.deleteBtnUser.value;
  const url = `/api/users/${email}`;
  const opt = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  };
  await send(url, opt);
  return false;
}

async function send(url, opt) {
  await fetch(url, opt).then((res) => {
    if (res.status === 201) {
      alertPass("Role Changed");
    } else if (res.status === 200) {
      alertPass("User deleted succesfully");
    } else if (res.status === 404) {
      alertPass("You need to update your files before");
    } else {
      alertPass("Invalid Operation");
    }
  });
}
async function sendDeleteInactives(url, opt) {
  await fetch(url, opt).then((res) => {
    if (res.status === 200) {
      alertPass("Inactive users deleted succesfully");
    } else if (res.status === 404) {
      alertPass("No inactive users to delete");
    } else {
      alertPass("Invalid Operation");
    }
  });
}

function alertPass(msj) {
  const span = document.createElement("span");
  span.textContent = msj;
  const existingSpan = form.querySelector("span");
  existingSpan ? form.replaceChild(span, existingSpan) : form.appendChild(span);
}
