import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || "7000";
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(() => {
  console.log("Database is connected.");
}).catch((error) => {console.log(error)});


app.use(cors({
  origin : "http://localhost:5173"
}));

const userSchema = new mongoose.Schema({
  firstname : {
    type : String,
    require : true
  },
  lastname : {
    type : String,
    require : true
  },
  username : {
    type : String,
    require : true
  },
  password : {
    type : String,
    require : true
  },
  title : {
    type : Boolean,
    require : true
  }
});

const user = mongoose.model("User", userSchema);

app.get("/", (req, res) => {

  console.log("login");

  user.findOne({username:req.query.username}).then((users) => {

    console.log("Username: " + users.username);
    console.log("Password: " + users.password);
    console.log("Title: " + users.title);
    console.log(users.password == "password");

    if(users) {
      if(users.title === "true") {
        console.log("Admin User");
        return res.send("Admin User: " + users.firstname + " " + users.lastname);
      } else if(req.query.password == users.password) {
        console.log("Correct Username and Password " + users.firstname + " " + users.lastname);
        return res.send("Correct Username and Password " + users.firstname + " " + users.lastname);
      } else {
        console.log("Incorrect Password");
        return res.send("Incorrect Password");
      }
    } else {
      user.findOne({password:req.query.password}).then((userPass) => {
        if(userPass) {
          console.log("Incorrect Username");
          return res.send("Incorrect Username");
        } else {
          console.log("Incorrect Username and Password");
          return res.send("Incorrect Username and Password");
        }
      })
    }
   })
})

app.get("/signup", (req, res) => {

  console.log("sign up");

  console.log("Firstname: " + req.query.firstname + " ");
  console.log("Lastname: " + req.query.lastname + " ");
  console.log("Username: " + req.query.username + " ");
  console.log("Password: " + req.query.password + " ");
  console.log("Title: " + req.query.title)

  if(req.query.password.length < 5) {
    return res.send("Password is too short");
  } else {
    user.findOne({username:req.query.username}).then((users) => {
    if(users) {
      return res.send("Username already exists. Please create a different username.");
    } else {
      const user1 = new user({
        firstname : req.query.firstname,
        lastname : req.query.lastname,
        username : req.query.username,
        password : req.query.password,
        title : req.query.title
      });
      user1.save();
      console.log("New User Created");
      if(req.query.title === "true") {
        console.log("New Admin User");
        return res.send("Admin " + req.query.firstname + " " + req.query.lastname + " " + req.query.username + " " + req.query.password);
      } else {
        return res.send(req.query.firstname + " " + req.query.lastname + " " + req.query.username + " " + req.query.password);
      }
    }
  });
  }
});

app.get("/update", (req, res) => {
  console.log("Firstname: " + req.query.firstname + " ");
  console.log("Lastname: " + req.query.lastname + " ");
  console.log("Username: " + req.query.username + " ");
  console.log("Password: " + req.query.password);

  user.findOne({username:req.query.username}).then((users) => {
    if(users) {
      users.firstname = req.query.firstname;
      users.lastname = req.query.lastname;
      users.password = req.query.password;

      users.save().then(() => {
        console.log("User updated");
        res.send(users.firstname + " " + users.lastname + " " + users.password);
      })

    } else {
      console.log("User not found");
      res.send("User not found");
    }
  });

});

app.get("/home", (req, res) => {
  if(req.query.title) {
    if(req.query.userDelete) {
      user.findOneAndDelete({username:req.query.userDelete}).then((user) => {
      if(user) {
        console.log("Deleted User");
      }
     })
     user.find({}).then((users) => {
        res.json(users);
     })
    } else {
      user.find({}).then((users) => {
        res.json(users);
      })
    }
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});