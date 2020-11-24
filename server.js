const express = require("express");
const monggose = require("mongoose");
const bodyParser = require("body-parser");
const items = require("./routes/api/items");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const MONGO_URL = "mongodb://localhost:27017/";
const DATABASE_NAME = "jer_shopping_list_db";

monggose
  .connect(`${MONGO_URL}${DATABASE_NAME}`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected "))
  .catch((err) => console.log(err));

app.use("/api/items", items);

app.listen(PORT, () => console.log(`Listening to PORT: ${PORT}`));
