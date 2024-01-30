import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './pages/nav/Nav';
import Home from './pages/home/home';
import Signin from './pages/signin/Signin';
import Login from './pages/login/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
function App() {
  
  function notify() {
    //It takes two parameters: the content of the toast and the configuration options.
    toast.info(
      //1-content/message/information
      <div style={{ fontWeight: 'bold', fontSize: '1.5em', color:'green', }}>
        <p>I am working on the UI.</p>
        <p>You must check Functionality.</p>
        {/* <button onClick={() => toast.dismiss()}>Cancel</button> */}
      </div>,
      //2-configuration
      {
        position: 'top-center',
        autoClose: false,
        // closeOnClick: false,
        // closeButton: false,// by default it true, means x button appear and it works
        draggable: false,
      }
    );
  }
  useEffect(() => {
    notify(); // Call notify when the component mounts
  }, []);

  //(ToastContainer) responsible for rendering and managing toast notifications in your React application.
  //This(ToastContainer) component should be rendered once at the root level of your application to provide
  // a container for all toast notifications.
  return (
    <Router>
      <div>
        <ToastContainer />
      </div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
