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
  const [userTrue, setUserTrue] = useState(true);
  const [passTrue, setPassTrue] = useState(true);

  function formSubmit(event) {

    event.preventDefault();

    if(username != info['username']) {
      console.log("Incorrect Username");
      setUserTrue(false);
    } else {
      console.log("Correct Username");
      setUserTrue(true);
    }

    
    if(password != info['password']) {
      console.log("Incorrect Password");
      setPassTrue(false);
    } else {
      console.log("Correct Password");
      setPassTrue(true);
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
      <label class="fs-4">Username: <input type='text' onChange={handleUsername} class="form-control size fs-4 rounded-top rounded-bottom" className={userTrue ? "bg-white" : "bg-danger"}/></label><br /><br />
      <label class="fs-4">Password: <input type='password' onChange={handlePassword} class="form-control size fs-4 rounded-top rounded-bottom" className={passTrue ? "bg-white" : "bg-danger"}/></label><br /><br />
      <input type='submit' class="btn btn-primary btn-lg size fs-4 button-hover rounded-top rounded-bottom"/>
    </form>
  );
}

createRoot(document.getElementById('root')).render(
  <MyApp />
)
