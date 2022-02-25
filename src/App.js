import { Route, Routes, Link, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home'
import Register from './components/Register';
import LoginLogout from './components/LoginLogout';

function App() {

  return (
    <Router>
      <div>

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link to={"/"} className="navbar-brand" href="#">Home <span className="sr-only">(current)</span></Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/Register"} className="nav-link" href="#">Sign Up</Link>
              </li>
              <li className="nav-item">
                <Link to={"/LoginLogout"} className="nav-link" href="#">Login</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Register" element={<Register />} />
            <Route exact path="/LoginLogout" element={<LoginLogout />} />
          </Routes>
        </div>





      </div>

    </Router>

  );
}

export default App;