const express = require("express");
const app = express();
const port = 4555;

const static = express.static("public");

//adding middleware
app.use(static);

app.get("/part2", (req, res) => {
  res.send("another one");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
