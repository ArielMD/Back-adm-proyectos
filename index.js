const express = require("express");
const conectionDB = require("./config/database");
const routes = require("./api/routes");

app = express();

conectionDB();

port = process.env.PORT || 4000;

app.use(routes);

app.listen(port, () => {
  console.log(`Aplicattion running on port ${port}`);
});
