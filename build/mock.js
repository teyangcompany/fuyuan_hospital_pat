const express = require("express");
const config = require("../config");
const bodyParser = require("body-parser");

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

const api = require("../mock/index");
app.post("/", api);


app.listen(config.mock.port);
