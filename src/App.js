
// import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './pages/nav/Nav';
import Home from './pages/home/home';
import Signin from './pages/signin/Signin';
import Login from './pages/login/Login';

function App() {
  return (
    <Router>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
