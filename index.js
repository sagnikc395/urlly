const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser"); // to parse the response

const static = express.static("public");

const admin = require("firebase-admin");

const serviceAccount = require("./pvt/urlly-6a449-firebase-adminsdk-su7rd-e65d406279.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//adding middleware
app.use(static);
app.use(bodyParser.json());
app.get("/part2", (req, res) => {
  res.send("another one");
});

const urllyDB = admin.firestore().collection("urllyDB");
const usersDB = admin.firestore().collection("usersDB");

app.post("/:short/", (req, res) => {
  //console.log(req.params);
  const short = req.params.short;
  const doc = urllyDB.doc(short);

  doc.get().then((resp) => {
    const data = resp.data();
    //console.log(data);
    if (data && data.url) {
      res.redirect(301, data.url);
    } else {
      res.redirect(301, "https://example.com");
    }
  });
});

app.post("/admin/urls/", (req, res) => {
  const { email, password, short, url } = req.body;

  usersDB
    .doc(email)
    .get()
    .then((response) => {
      const user = response.data();

      if (user && user.email == email && user.password == password) {
        const doc = usersDB.doc(short);
        doc.set({ url });
        res.send("Done sending.");
      } else {
        res.send(403, "Not possible to send.");
      }
    });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
