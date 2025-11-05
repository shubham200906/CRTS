import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors({
  origin : "http://localhost:5173"
}));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "shiv-4me",
  database: "shubhamdb"
});

db.connect((err) => {
  if(err) {
    console.log("DB Connection Error");
    process.exit(1);
  }
});

let sql = "";
let sql2 = "";

app.get("/", (req, res) => {
  console.log("login");

  sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [req.query.username], (err, rows) => {
    if(err) return res.send("Server Error");
    if(!rows || rows.length === 0) return res.send("Incorrect Username and Password");

    for(let i = 0; i < rows.length; i++) {
      if(rows[i].username == req.query.username) {
        console.log(rows[i].title);
        if(rows[i].title) {
          console.log("Admin User");
          return res.send("Admin User: " + rows[i].firstname + " " + rows[i].lastname);
        } else if(rows[i].password == req.query.password) {
          console.log("Correct Username and Password " + rows[i].firstname + " " + rows[i].lastname);
          return res.send("Correct Username and Password " + rows[i].firstname + " " + rows[i].lastname);
        } else {
          console.log("Incorrect Password");
          return res.send("Incorrect Password");
        }
      } else {
        sql2 = "SELECT * FROM users WHERE password = ?";
        db.query(sql2, [req.query.password], (err2, rows2) => {
          if(err2) return res.send("Server Error");
          if(rows2 && rows2.length > 0) {
            console.log("Incorrect Username");
            return res.send("Incorrect Username");
          } else {
            console.log("Incorrect Username and Password");
            return res.send("Incorrect Username and Password");
          }
        })
      }
    }
  })
})

app.get("/signup", (req, res) => {
  console.log("sign up");

  console.log("Firstname: " + req.query.firstname + " ");
  console.log("Lastname: " + req.query.lastname + " ");
  console.log("Username: " + req.query.username + " ");
  console.log("Password: " + req.query.password + " ");
  console.log("Title: " + req.query.title);

  const isAdmin = req.query.title === "true";

  if(!req.query.password || req.query.password.length < 5) {
    return res.send("Password is too short");
  } else {
    sql = "SELECT * FROM users where username = ?";
    db.query(sql, [req.query.username], (err, rows) => {
      if(err) {
        console.log(err);
        return res.send("Server Error");
      }
      if(rows && rows.length > 0) {
        return res.send("Username already exists. Please create a different username.");
      } else {
        sql2 = "INSERT INTO users (firstname, lastname, username, password, title) VALUES (?, ?, ?, ?, ?)";
        db.query(sql2, [req.query.firstname, req.query.lastname, req.query.username, req.query.password, req.query.title], (err2, rows2) => {
          if(err2) {
            console.log(err2);
            return res.send("Server Error");
          }
          console.log("New User Created");
          console.log(isAdmin);
          if(isAdmin) {
            console.log("New Admin User");
            return res.send("Admin " + req.query.firstname + " " + req.query.lastname + " " + req.query.username + " " + req.query.password);
          } else {
            return res.send(req.query.firstname + " " + req.query.lastname + " " + req.query.username + " " + req.query.password);
          }
        })
      }
    });
  }
});

app.get("/update", (req, res) => {
  if(req.query.searchUser) {
    console.log("Search User: " + req.query.searchUser);
    sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [req.query.searchUser], (err, rows) => {
      if(err) return res.send("Server Error");
      if(rows && rows.length > 0) {
        res.send(rows[0].firstname + " " + rows[0].lastname + " " + rows[0].password);
      } else {
        res.send("User not found");
      }
    })
  } else {
    sql = "SELECT * FROM users where username = ?";
    db.query(sql, [req.query.username], (err2, rows2) => {
      if(err2) return res.send("Server Error");
      if(rows2 && rows2.length == 1) {
        let updateUser = {
          firstname : req.query.firstname,
          lastname : req.query.lastname,
          password : req.query.password
        }

        sql2 = "UPDATE users SET firstname = ?, lastname = ?, password = ? WHERE username = ?";
        db.query(sql2, [updateUser.firstname, updateUser.lastname, updateUser.password, req.query.username], (err3, rows3) => {
          if(err3) return res.send("Server Error");
          console.log("User updated");
          res.send(updateUser.firstname + " " + updateUser.lastname + " " + updateUser.password);
        })
      } else {
        console.log("User not found");
        res.send("User not found");
      }
    })
  }
});

app.get("/home", (req, res) => {
  if(req.query.id) {
    console.log("ID RECEIVED: " + req.query.id);
    sql = "SELECT * FROM emails WHERE ID = ?";
    db.query(sql, [req.query.id], (err, rows) => {
      console.log(rows);
      if(err) return res.json({emails: []});
      res.json({emails: rows});
    })
  } else {
    console.log("ID NOT RECEIVED");
    sql = "SELECT * FROM emails";
    db.query(sql, (err, rows) => {
      if(err) return res.json({emails: []});
      res.json({emails: rows || []});
    })
  }
});

app.get("/email", (req, res) => {
  console.log(req.query.id);
  if(req.query.title) {
    sql = "SELECT * FROM emails WHERE ID = ?";
    db.query(sql, [req.query.id], (err, rows) => {
      if(err) return res.json({emails: []});
      res.json({emails: rows || []});
      console.log(rows);
    })
  } else {
    res.send("Invalid Request");
  }
})

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});