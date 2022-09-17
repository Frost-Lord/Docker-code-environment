import "./login.css";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { loginRoute } from "../../routes/routes";
import styled from "styled-components";
import axios from "axios";

function App() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");



  const validateForm = (username, password) => {
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let dataa = validateForm(username, password);
    console.log(dataa);

    const data = await axios.post(loginRoute, {
      name: username ? username : "",
      password: password ? password : "",
     }).catch(error => {
      console.log(error);
      toast.error("Invalid username or password!", toastOptions);
     })
      console.log(data);
      console.log(data.data.localuser);
      if(data.status === 200){
        toast.success("Successfully registered", toastOptions);
        localStorage.setItem("LOCALHOST_KEY", JSON.stringify(data.data.localuser));
        navigate(`/dashboard/`);
      }
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <FormContainer>
        <div className="App">
          <header className="App-header">
            <h1>Docker Manager</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={(event) => setUsername(event.target.value)}
                value={username}
                min="3"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                min="3"
              />
              <button type="submit">Log In</button>
              <span>
                Don't have an account ? <a href="/register">Register</a>
              </span>
            </form>
          </header>
        </div>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #0b0a15;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default App;