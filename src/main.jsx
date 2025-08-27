import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function MyApp() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function formSubmit(event) {

    event.preventDefault();
    console.log(username);
    console.log(password);
  }

  function handleUsername(event) {
    setUsername(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  return (
    <form onSubmit={formSubmit}>
      <label>Username: <input type='text' onChange={handleUsername} /></label><br />
      <label>Password: <input type='password' onChange={handlePassword} /></label> <br />
      <input type='submit'/>
    </form>
  );
}

createRoot(document.getElementById('root')).render(
  <MyApp />
)
