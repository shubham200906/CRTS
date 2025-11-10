import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route, useNavigate, useSearchParams, Link } from 'react-router-dom'

function Email({firstName, lastName, username, title, emails, emailID, setEmails, setEmailID}) {

  useEffect(() => {
    if(title) {
      fetch(`http://localhost:3000/email?title=${title}&id=${emailID}`)
      .then(response => response.json())
      .then(result => {
        console.log(result.emails[0]);
        setEmails(result.emails);
      })
    }
  }, [title])

  if(title) {
    return (
      <>
        <nav className="navbar bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <div className={`d-flex w-100 justify-content-end`}>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
            
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Hello, {firstName} {lastName} ({username})</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link to={`/home?title=${title}`} className={`nav-link mb-0 h5`}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={`/update?username=${username}`} className={`nav-link mb-0 h5`}>Update User</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {emails.map((email, index) => {
        return (
          <div key={index}>
            <p>Body: {email.Body}</p><br /><br />
            <p>Subject: {email.Subject}</p>
            <p>To: {email.To}</p>
            <p>From: {email.From}</p>
          </div>
      )})}
    </>
    )
  }
}

function Update({firstName, lastName, username, title, setFirstName, setLastName}) {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const uname = searchParams.get("username");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [passName, setPassName] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/update?searchUser=${uname}`)
    .then(response => response.text())
    .then(result => {
      const names = result.split(" ");
      setFName(names[0]);
      setLName(names[1]);
      setPassName(names[2]);
    })
  }, [uname])

  function formSubmit(event) {
    event.preventDefault();

    fetch(`http://localhost:3000/update?firstname=${fname}&lastname=${lname}&username=${uname}&password=${passName}`)
    .then(response => response.text())
    .then(result => {
      if(!result.includes("User not found")) {
        const names = result.split(" ");
        setFName(names[0]);
        setLName(names[1]);
        setPassName(names[2]);
        setFirstName(names[0]);
        setLastName(names[1]);
        navigate("/home");
      }
    })
  }

  function handlePassword(event) {
    setPassName(event.target.value);
  }

  function handleFirstName(event) {
    setFName(event.target.value);
  }

  function handleLastName(event) {
    setLName(event.target.value);    
  }

  if(title) {
    return (
      <>
        <nav className="navbar bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <div className={`d-flex w-100 justify-content-end`}>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
            
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Hello, {firstName} {lastName} ({username})</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link to={`/home?title=${title}`} className={`nav-link mb-0 h5`}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={`/update?username=${username}`} className={`nav-link mb-0 h5`}>Update User</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <h1>Update User Profile:</h1><br /><br />
      <form onSubmit={formSubmit} method="get">
        <label className={`fs-4`}>First Name: <input type='text' onChange={handleFirstName} className={`form-control size fs-4 rounded-top rounded-bottom`} name="fname" value={fname}/></label><br /><br />
        <label className={`fs-4`}>Last Name: <input type='text' onChange={handleLastName} className={`form-control size fs-4 rounded-top rounded-bottom`} name="lname" value={lname}/></label><br /><br />
        <input type="hidden" value={username} />
        <label className={`fs-4`}>Password: <input type='password' onChange={handlePassword} className={`form-control size fs-4 rounded-top rounded-bottom`} name="password" value={passName}/></label><br /><br />
        <input type='submit' value="Update" className={`btn btn-primary btn-lg size fs-4 button-hover rounded-top rounded-bottom`}/>
      </form>
    </>
    )
  } else {
    return (
      <>
        <nav className="navbar bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <div className={`d-flex w-100 justify-content-end`}>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
            
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Hello, {firstName} {lastName} ({username})</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link to={`/home?title=${title}`} className={`nav-link mb-0 h5`}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={`/update?username=${username}`} className={`nav-link mb-0 h5`}>Update User</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <h1>Update User Profile:</h1><br /><br />
      <form onSubmit={formSubmit} method="get">
        <label className={`fs-4`}>First Name: <input type='text' onChange={handleFirstName} className={`form-control size fs-4 rounded-top rounded-bottom`} name="fname" value={fname}/></label><br /><br />
        <label className={`fs-4`}>Last Name: <input type='text' onChange={handleLastName} className={`form-control size fs-4 rounded-top rounded-bottom`} name="lname" value={lname}/></label><br /><br />
        <input type="hidden" value={username} />
        <label className={`fs-4`}>Password: <input type='password' onChange={handlePassword} className={`form-control size fs-4 rounded-top rounded-bottom`} name="password" min-length='5' value={passName}/></label><br /><br />
        <input type='submit' value="Update" className={`btn btn-primary btn-lg size fs-4 button-hover rounded-top rounded-bottom`}/>
      </form>
      </>
    );
  }
}

function Home({firstName, lastName, username, title, emails, emailID, setFirstName, setLastName, setUsername, setPassword, setTitle, setEmails, setEmailID}) {

  const navigate = useNavigate();
  const [popup, showPopup] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState([]);

  function handleSignOut() {
    setFirstName("");
    setLastName("");
    setUsername("");
    setPassword("");
    setTitle(false);
    navigate("/");
  }

  function viewDetails(event) {
    showPopup(false);
    setEmailID(event.target.value);
    navigate(`/email?id=${event.target.value}`);
  }

  function viewRequest(event) {
    showPopup(true);
    event.preventDefault();

    console.log("Emails:" + event.target.value);
    let url = `http://localhost:3000/home?title=${title}&id=${event.target.value}`

    fetch(url)
    .then(response => response.json())
    .then(result => {
      console.log(result.emails[0]); 
      setSelectedEmail(result.emails);
    })
  }

  useEffect(() => {
      if(title) {
      fetch(`http://localhost:3000/home?title=${title}`)
      .then(response => response.json())
      .then(result => {
        console.log(result.emails);
        setEmails(result.emails);
      })
    }
  }, [title])

  if(title) {
    return (
      <>
        <nav className="navbar bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <div className={`d-flex w-100 justify-content-end`}>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
            
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Hello, {firstName} {lastName} ({username})</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link to={`/home?title=${title}`} className={`nav-link mb-0 h5`}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={`/update?username=${username}`} className={`nav-link mb-0 h5`}>Update User</Link>
                </li>
                <li className="nav-item">
                  <Link to={`/`} className={`nav-link mb-0 h5`} onClick={handleSignOut}>Sign Out</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

        <div>
          <h1>Welcome, {firstName} {lastName}.</h1><br /><br />
          {popup && (
          <>
            <div className={`modal show d-block`} tabIndex="-1" role="dialog">
              <div className={`modal-dialog modal-dialog-scrollable modal-lg`}>
                <div className={'modal-content'}>
                  <div className={`modal-header`}>
                    <h5 className={`modal-title`}>Email</h5>
                    <button type="button" className={`btn-close`} onClick={() => showPopup(false)}>
                    </button>
                  </div>
                  <div className={`modal-body`}>
                    {selectedEmail.map((email, index) => {
                      return (
                        <div key={index}>
                          <p className={`fw-bold`}>Email ID: </p><p>{email.ID}</p><br />
                          <p className={`fw-bold`}>From: </p><p>{email.From}</p><br />
                          <p className={`fw-bold`}>To: </p><p>{email.To}</p><br />
                          <p className={`fw-bold`}>Product: </p><p>{email.Product}</p><br />
                          <p className={`fw-bold`}>Subject: </p><p>{email.Subject}</p><br />
                          <p className={`fw-bold`}>Body: </p><p>{email.Body}</p><br />
                        </div>
                      )
                    })}
                  </div>
                  <div className={`modal-footer`}>
                    <button type="button" className={'btn btn-secondary'} onClick={() => showPopup(false)}>Close</button>
                  </div>
                </div>
              </div>
            </div>
           <div className={`modal-backdrop fade show`}></div>
          </>)}
          <table className={`table table-hover`}>
            <thead>
              <tr>
                <th>ID</th>
                <th>From</th>
                <th>Subject</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {emails.map((email, index) => {
                  return (
                    <tr key={index}>
                      <td>{email.ID}</td>
                      <td>{email.From}</td>
                      <td>{email.Subject}</td>
                      <td>
                      <button className={`btn btn-secondary dropdown-toggle`} type="button" data-bs-toggle="dropdown">
                        Action
                      </button>
                      <ul className={`dropdown-menu`}>
                        <li><button type="button" className={`dropdown-item`} value={email.ID} onClick={viewRequest}>View Request</button></li>
                        <li><button type="button" className={`dropdown-item`} value={email.ID} onClick={viewDetails}>View Details</button></li>
                      </ul>
                      </td>
                    </tr>
                  )
              })}
            </tbody>
          </table>
        </div>
      </>
    )
  } else {
    return (
      <>
        <nav className="navbar bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <div className={`d-flex w-100 justify-content-end`}>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
            
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Hello, {firstName} {lastName} ({username})</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link to={`/home?title=${title}`} className={`nav-link mb-0 h5`}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={`/update?username=${username}`} className={`nav-link mb-0 h5`}>Update User</Link>
                </li>
                <li className="nav-item">
                  <Link to={`/`} className={`nav-link mb-0 h5`} onClick={handleSignOut}>Sign Out</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
        <div>
          <h1>Welcome, {firstName} {lastName}.</h1><br /><br />
        </div>
      </>
    );
  }
}

function SignUp({firstName, lastName, username, password, product, title, setFirstName, setLastName, setUsername, setPassword, setProduct, setTitle}) {
  const navigate = useNavigate();

  const [userTrue, setUserTrue] = useState(true);
  const [passTrue, setPassTrue] = useState(true);

  function formSubmit(event) {
    event.preventDefault();

    fetch(`http://localhost:3000/signup?firstname=${firstName}&lastname=${lastName}&username=${username}&password=${password}&product=${product}&title=${title}`)
    .then(response => response.text())
    .then(result => {
      
      console.log(result);

      if(result.includes("too short")) {
        setPassTrue(false);
        setTitle(false);
      } else {
        if(result.includes("Username already exists")) {
          setUserTrue(false);
          setPassTrue(true);
          setTitle(false);
        } else {
          const names = result.split(" ");
          if(result.includes("Admin")) {
            setTitle(true);
            setFirstName(names[1]);
            setLastName(names[2]);
            setUsername(names[3]);
            setPassword(names[4]);
          } else {
            setTitle(false);
            setFirstName(names[0]);
            setLastName(names[1]);
            setUsername(names[2]);
            setPassword(names[3]);
          }
          setUserTrue(true);
          setPassTrue(true);
          navigate("/home");
        }
      }

    });
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

  function handleProduct(event) {
    setProduct(event.target.value);
  }

  function handleAdmin(event) {
    setTitle(event.target.checked);
  }

  return (
    <>
    <h1>CRTS Sign Up</h1><br />
    <form onSubmit={formSubmit} method="get">
      <label className={`fs-4`}>First Name: <input type='text' onChange={handleFirstName} className={`form-control size fs-4 rounded-top rounded-bottom`} name="fname"/></label><br />
      <label className={`fs-4`}>Last Name: <input type='text' onChange={handleLastName} className={`form-control size fs-4 rounded-top rounded-bottom`} name="lname"/></label><br />
      <label className={`fs-4`}>Email: <input type='email' value={username} onChange={handleUsername} className={`form-control size fs-4 rounded-top rounded-bottom ${userTrue ? "bg-white" : "bg-danger"}`} name="username"/></label><br />
      <label className={`fs-4`}>Password: <input type='password' value={password} onChange={handlePassword} className={`form-control size fs-4 rounded-top rounded-bottom ${passTrue ? "bg-white" : "bg-danger"}`} name="password"/></label><br />
      <label className={`fs-4`}>Product: <input type='text' onChange={handleProduct} className={`form-control size fs-4 rounded-top rounded-bottom`} name="product"/></label><br /><br />
      <label className={`fs-4`}><input type="checkbox" name="checkAdmin" onClick={handleAdmin} /> Admin?</label><br /><br />
      <input type='submit' value="Sign Up" className={`btn btn-primary btn-lg size fs-4 button-hover rounded-top rounded-bottom`}/>
    </form>
    </>
  );
}

function Login({username, password, title, setFirstName, setLastName, setUsername, setPassword, setTitle}) {

  const navigate = useNavigate();

  const [userTrue, setUserTrue] = useState(true);
  const [passTrue, setPassTrue] = useState(true);

  function formSubmit(event) {
    event.preventDefault();

    fetch(`http://localhost:3000/?username=${username}&password=${password}&title=${title}`)
    .then(response => response.text())
    .then(result => {
      
      console.log(result);

      if(result.includes("Admin")) {
        setTitle(true);
        setUserTrue(true);
        setPassTrue(true);
        const names = result.split(" ");
        setFirstName(names[2]);
        setLastName(names[3]);
        navigate(`/home?title=${title}`);
      } else if(result.includes("Incorrect Username and Password")) {
        setUserTrue(false);
        setPassTrue(false);
        setTitle(false);
      } else if(result.includes("Incorrect Username")) {
        setUserTrue(false);
        setTitle(false);
      } else if(result.includes("Incorrect Password")) {
        setPassTrue(false);
        setTitle(false);
      } else if(result.includes("Correct Username and Password")) {
        setUserTrue(true);
        setPassTrue(true);
        setTitle(false);
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
      <h1>CRTS Login</h1><br /><br /><br />
      <form onSubmit={formSubmit} method="get">
        <label className={`fs-4`}>Email: <input type='email' value={username} onChange={handleUsername} className={`form-control size fs-4 rounded-top rounded-bottom ${userTrue ? "bg-white" : "bg-danger"}`} name="username"/></label><br /><br />
        <label className={`fs-4`}>Password: <input type='password' value={password} onChange={handlePassword} className={`form-control size fs-4 rounded-top rounded-bottom ${passTrue ? "bg-white" : "bg-danger"}`} name="password"/></label><br /><br />
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
  const [title, setTitle] = useState(false);
  const [emails, setEmails] = useState([]);
  const [emailID, setEmailID] = useState("");
  const [product, setProduct] = useState("");

  useEffect(() => {
      document.title = "CRTS";
  }, []);

  return (

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login username={username} password={password} title={title} setFirstName={setFirstName} setLastName={setLastName} setUsername={setUsername} setPassword={setPassword} setTitle={setTitle}/>}></Route>
      <Route path="/signup" element={<SignUp firstName={fname} lastName={lname} username={username} password={password} product={product} title={title} setFirstName={setFirstName} setLastName={setLastName} setUsername={setUsername} setPassword={setPassword} setProduct={setProduct} setTitle={setTitle}/>}></Route>
      <Route path="/home" element={<Home firstName={fname} lastName={lname} username={username} title={title} emails={emails} emailID={emailID} setFirstName={setFirstName} setLastName={setLastName} setUsername={setUsername} setPassword={setPassword} setTitle={setTitle} setEmails={setEmails} setEmailID={setEmailID}/>}></Route>
      <Route path="/update" element={<Update firstName={fname} lastName={lname} username={username} title={title} setFirstName={setFirstName} setLastName={setLastName}/>}></Route>
      <Route path="/email" element={<Email firstName={fname} lastName={lname} username={username} title={title} emails={emails} emailID={emailID} setEmails={setEmails} setEmailID={setEmailID}/>}></Route>
    </Routes>
  </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(
  <AppWrapper />
)