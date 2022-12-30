const axios = require("axios").default;

export default function genShortURL(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const short = document.getElementById("short").value;
  const url = document.getElementById("url").value;

  const data = { email, password, short, url };

  axios
    .post("/admin/urls/", data)
    .then((response) => {
      alert("Generated Short URL");
    })
    .catch((err) => {
      alert("Failed to load");
    });
}
