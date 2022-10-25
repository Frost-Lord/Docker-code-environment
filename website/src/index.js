import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactDOMClient from 'react-dom/client';

import './index.css';
////////////////Pages/////////////////////////
import Home from './pages/root/index';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Dashboard from './pages/dashboard/manage';
import Container from './pages/dashboard/container';
import reportWebVitals from './reportWebVitals';


const root = ReactDOMClient.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Routes>
    <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/:containerid/container" element={<Container />} />
    </Routes>
  </Router>,
);


reportWebVitals();