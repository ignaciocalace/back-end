const socket = io();

/** @type {HTMLInputElement | null} */
const inputMsg = document.querySelector("#inputMsg");

/** @type {HTMLInputElement | null} */
const inputUser = document.querySelector("#inputUser");

inputUser?.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") {
    if (inputUser.value.trim().length > 0) {
      socket.emit("newMessage", {
        user: inputUser.value,
        Message: inputMsg?.value,
      });
      inputUser.value = "";
    }
  }
});

Swal.fire({
  title: "Type your email",
  input: "text",
  inputValidator: (value) => {
    return !value && "You need an email to access the chat";
  },
  allowOutsideClick: false,
}).then((result) => {
  inputUser.value = result.value;
  socket.emit("newUser", result.value);
});

document.querySelector("#btnNewMsg")?.addEventListener("click", (ev) => {
  console.log("click");
  if (
    inputUser instanceof HTMLInputElement &&
    inputMsg instanceof HTMLInputElement &&
    inputUser.value &&
    inputMsg.value
  ) {
    const msg = {
      user: inputUser.value,
      message: inputMsg.value,
    };

    socket.emit("newMessage", msg);
  }
});

const messagesTemplate = `
{{#if isMessages}}
<ul>
    {{#each messages}}
    <li>{{this.user}}: {{this.message}}</li>
    {{/each}}
</ul>
{{else}}
No messeges
{{/if}}`;

const makeMsgHtml = Handlebars.compile(messagesTemplate);

socket.on("messages", (messages) => {
  const messagesDiv = document.querySelector("#messages");
  if (messagesDiv) {
    messagesDiv.innerHTML = makeMsgHtml({
      isMessages: messages.length > 0,
      messages,
    });
  }
});

socket.on("newUser", (user) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    title: `${user} has enter to chat`,
    icon: "success",
  });
});

socket.emit("refreshMessages");
