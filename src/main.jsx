import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function MyApp() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userTrue, setUserTrue] = useState(true);
  const [passTrue, setPassTrue] = useState(true);

  const [data, setData] = useState(true);

  function formSubmit(event) {
    event.preventDefault();

    fetch(`http://localhost:3000/?username=${username}&password=${password}`, {
      method: "GET",
    })
    .then(response => response.text())
    .then(result => {
      
      setData(result);
      console.log(result);

      if(result.includes("Incorrect Username")) {
        setUserTrue(false);
      }

      if(result.includes("Incorrect Password")) {
        setPassTrue(false);
      }

      if(result.includes("Incorrect Username and Password")) {
        setUserTrue(false);
        setPassTrue(false);
      }

      if(result.includes("Correct Username and Password")) {
        setUserTrue(true);
        setPassTrue(true);
      }
    });
  }

  function handleUsername(event) {
    setUsername(event.target.value);
    setUserTrue(true);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
    setPassTrue(true);
  }

  // in formsubmit, bring it back to the code it was before (it should perform the code locally - you have info in react)
  // send request to app.js (call localhost:3000), and in app.js create method called validateUser from the client and sends a response saying valid/invalid username/password

  return (
    <form onSubmit={formSubmit} method="get">
      <label class="fs-4">Username: <input type='text' onChange={handleUsername} className={`form-control size fs-4 rounded-top rounded-bottom ${userTrue ? "bg-white" : "bg-danger"}`} name="username"/></label><br /><br />
      <label class="fs-4">Password: <input type='password' onChange={handlePassword} className={`form-control size fs-4 rounded-top rounded-bottom" ${passTrue ? "bg-white" : "bg-danger"}`} name="password"/></label><br /><br />
      <input type='submit' class="btn btn-primary btn-lg size fs-4 button-hover rounded-top rounded-bottom"/>
    </form>
  );
}

createRoot(document.getElementById('root')).render(
  <MyApp />
)
