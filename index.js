require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./src/config/db");

const signupRoute = require("./src/user/signup.route");
const loginRoute = require("./src/user/login.route");

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/signup",signupRoute)
app.use("/login",loginRoute)

app.get("/",(req,res)=>{
  res.send("vuhdjskandckjskdnashkbj")
})
app.listen(PORT, async () => {
  await connect();
  console.log(`Listening to http://localhost:${PORT}`);
});
