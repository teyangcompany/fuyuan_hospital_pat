const express = require("express");
const config = require("../config");
const bodyParser = require("body-parser");
const opn = require("opn");

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

const api = require("../mock/index");
app.post("/", api);
app.get("/", (req, res) => {
  res.send("mock api is ok");
})


app.listen(config.mock.port, () => {
  //opn("http://127.0.0.1:" + config.mock.port + "/");
});
