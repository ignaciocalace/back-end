export async function renderChat(req, res) {
  try {
    res.render("chat", { title: "Chat" });
  } catch (error) {
    res.status(404).json("Error rendering chat");
  }
}
