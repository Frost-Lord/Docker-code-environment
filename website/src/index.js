import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom";

import './index.css';
/////////////////////////////////////////////////////////////
import Home from './pages/root/index';
import Login from './pages/auth/login';
import Register from './pages/auth/register';

import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </Router>,

  document.getElementById("root")
);


reportWebVitals();