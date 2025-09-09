import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'

function Home() {
  return (<h1>Welcome to the Home Page!</h1>);
}

function MyApp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userTrue, setUserTrue] = useState(true);
  const [passTrue, setPassTrue] = useState(true);

  function formSubmit(event) {
    event.preventDefault();

    fetch(`http://localhost:3000/?username=${username}&password=${password}`)
    .then(response => response.text())
    .then(result => {
      
      console.log(result);

      if(result.includes("Incorrect Username and Password")) {
        setUserTrue(false);
        setPassTrue(false);
      } else if(result.includes("Incorrect Username")) {
        setUserTrue(false);
      } else if(result.includes("Incorrect Password")) {
        setPassTrue(false);
      } else if(result.includes("Correct Username and Password")) {
        setUserTrue(true);
        setPassTrue(true);
        console.log("Navigating to home");
        navigate("/home");
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

  return (
    <form onSubmit={formSubmit} method="get">
      <label className={`fs-4`}>Username: <input type='text' onChange={handleUsername} className={`form-control size fs-4 rounded-top rounded-bottom ${userTrue ? "bg-white" : "bg-danger"}`} name="username"/></label><br /><br />
      <label className={`fs-4`}>Password: <input type='password' onChange={handlePassword} className={`form-control size fs-4 rounded-top rounded-bottom ${passTrue ? "bg-white" : "bg-danger"}`} name="password"/></label><br /><br />
      <input type='submit' className={`btn btn-primary btn-lg size fs-4 button-hover rounded-top rounded-bottom`}/>
    </form>
  );
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={(<MyApp />)}></Route>
      <Route path="/home" element={(<Home />)}></Route>
    </Routes>
  </BrowserRouter>
)
