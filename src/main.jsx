import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'


function Home({firstName, lastName, setFirstName, setLastName, setUsername, setPassword}) {

  const navigate = useNavigate();

  function handleSignOut() {
    setFirstName("");
    setLastName("");
    setUsername("");
    setPassword("");
    navigate("/");
  }

  return (
    <div>
      <h1>Welcome, {firstName} {lastName}.</h1><br /><br />
      <h3><a href="/" onClick={handleSignOut}>Sign Out</a></h3>
    </div>
  );
}

function SignUp({firstName, lastName, username, password, setFirstName, setLastName, setUsername, setPassword}) {
  const navigate = useNavigate();

  function formSubmit(event) {
    event.preventDefault();

    fetch(`http://localhost:3000/signup?firstname=${firstName}&lastname=${lastName}&username=${username}&password=${password}`)
    .then(response => response.text())
    .then(result => {
      
      console.log(result);
      const names = result.split(" ");

      setFirstName(names[0]);
      setLastName(names[1]);
      setUsername(names[2]);
      setPassword(names[3]);

    });

    navigate("/home");
  }

  function handleUsername(event) {
    setUsername(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function handleFirstName(event) {
    setFirstName(event.target.value);
  }

  function handleLastName(event) {
    setLastName(event.target.value);
  }

  return (
    <form onSubmit={formSubmit} method="get">
      <label className={`fs-4`}>First Name: <input type='text' onChange={handleFirstName} className={`form-control size fs-4 rounded-top rounded-bottom`} name="fname"/></label><br /><br />
      <label className={`fs-4`}>Last Name: <input type='text' onChange={handleLastName} className={`form-control size fs-4 rounded-top rounded-bottom`} name="lname"/></label><br /><br />
      <label className={`fs-4`}>Email: <input type='Email' value={username} onChange={handleUsername} className={`form-control size fs-4 rounded-top rounded-bottom`} name="username"/></label><br /><br />
      <label className={`fs-4`}>Password: <input type='password' value={password} onChange={handlePassword} className={`form-control size fs-4 rounded-top rounded-bottom`} name="password" min-length='5'/></label><br /><br />
      <input type='submit' value="Log In" className={`btn btn-primary btn-lg size fs-4 button-hover rounded-top rounded-bottom`}/>
    </form>
  );
}

function Login({firstName, lastName, username, password, setFirstName, setLastName, setUsername, setPassword}) {

  const navigate = useNavigate();

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
        const names = result.split(" ");
        setFirstName(names[4]);
        setLastName(names[5]);
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
    <>
      <h1>Login Page</h1><br /><br /><br />
      <form onSubmit={formSubmit} method="get">
        <label className={`fs-4`}>Email: <input type='email' value={username} onChange={handleUsername} className={`form-control size fs-4 rounded-top rounded-bottom ${userTrue ? "bg-white" : "bg-danger"}`} name="username"/></label><br /><br />
        <label className={`fs-4`}>Password: <input type='password' value={password} onChange={handlePassword} className={`form-control size fs-4 rounded-top rounded-bottom ${passTrue ? "bg-white" : "bg-danger"}`} name="password" min-length='5'/></label><br /><br />
        <input type='submit' value="Log In" className={`btn btn-primary btn-lg size fs-4 button-hover rounded-top rounded-bottom`}/>
      </form><br />
      <h5>Don't have an account? Click <a href="/signup">here</a> to sign up.</h5>
    </>
  );
}

function AppWrapper() {
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login firstName={fname} lastName={lname} username={username} password={password} setFirstName={setFirstName} setLastName={setLastName} setUsername={setUsername} setPassword={setPassword}/>}></Route>
      <Route path="/signup" element={<SignUp firstName={fname} lastName={lname} username={username} password={password} setFirstName={setFirstName} setLastName={setLastName} setUsername={setUsername} setPassword={setPassword}/>}></Route>
      <Route path="/home" element={<Home firstName={fname} lastName={lname} setFirstName={setFirstName} setLastName={setLastName} setUsername={setUsername} setPassword={setPassword}/>}></Route>
    </Routes>
  </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(
  <AppWrapper />
)
