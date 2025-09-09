import express from "express";
import cors from "cors";
const app = express();

app.use(cors({
  origin : "http://localhost:5173"
}));

const info = {
    username : "Shubham",
    password : "hello"
};

app.get("/", (req, res) => {

  if(req.query.username != info["username"] && req.query.password != info["password"]) {
    res.send("Incorrect Username and Password");
  } else if(req.query.username != info["username"]) {
   res.send("Incorrect Username");
  } else if(req.query.password != info["password"]) {
    res.send("Incorrect Password");
  } else {
    res.send("Correct Username and Password");
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});