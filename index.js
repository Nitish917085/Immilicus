const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./models/userSchema");

const mongoose = require("mongoose");
const route = require("./routes");
const { data } = require("./sample_data");

const corsOrigin ={
    origin:'http://localhost:3000', //or whatever port your frontend is using
    credentials:true,            
    optionSuccessStatus:200
}
app.use(express.json());
app.use(cors(corsOrigin))

main().catch((err) => console.log(err));
main().then((err) => {
  // User.insertMany(data);
  console.log("database connected");
});
async function main() {
  await mongoose.connect(
    "mongodb+srv://immilicus:mK6bkVSmB4F55gim@cluster0.f93y4ir.mongodb.net/immilicus?retryWrites=true&w=majority"
  );
}

app.use("/", route);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server Started"));
