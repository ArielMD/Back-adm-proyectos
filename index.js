const express = require("express");
const conectionDB = require("./config/database");
const routes = require("./api/routes");
const cors = require("cors");

app = express();

conectionDB();

app.use(cors());
app.use(express.json({ extended: true }));
port = process.env.PORT || 4000;

app.use(routes);

app.listen(port, () => {
  console.log(`Aplicattion running on port ${port}`);
});
