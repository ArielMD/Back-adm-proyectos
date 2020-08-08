const express = require("express");
const conectionDB = require("./config/database");

app = express();

conectionDB();

port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Aplicattion running on port ${port}`);
});
