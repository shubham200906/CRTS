import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function MyApp() {

  const info = {
    username : "Shubham",
    password : "hello"
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function formSubmit(event) {

    event.preventDefault();

    if(username != info['username']) {
      console.log("Incorrect Username");
    } else {
      console.log("Correct Username");
    }

    
    if(password != info['password']) {
      console.log("Incorrect Password");
    } else {
      console.log("Correct Password");
    }
  }

  function handleUsername(event) {
    setUsername(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  return (
    <form onSubmit={formSubmit}>
      <label class="fs-4">Username: <input type='text' onChange={handleUsername} class="form-control size fs-4 rounded-top rounded-bottom"/></label><br /><br />
      <label class="fs-4">Password: <input type='password' onChange={handlePassword} class="form-control size fs-4 rounded-top rounded-bottom"/></label><br /><br />
      <input type='submit' class="btn btn-primary btn-lg size fs-4 button-hover rounded-top rounded-bottom"/>
    </form>
  );
}

createRoot(document.getElementById('root')).render(
  <MyApp />
)
