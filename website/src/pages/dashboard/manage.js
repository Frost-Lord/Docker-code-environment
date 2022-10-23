import "./manage.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function App() {
  const navigate = useNavigate();
  const [user, setuser] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("LOCALHOST_KEY")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    setuser(JSON.parse(localStorage.getItem("LOCALHOST_KEY")));
  }, []);



  return (
    <div className="App">
      <header className="App-header">
        <div className="container">

          <div className="row">
            <h1>Create a Container</h1>
            <form>
              <label>
                Container Name:ㅤ
                <input type="text" name="name" />
              </label>
              <br></br>
              <label>
                Container Type:ㅤ
                <select name="type">
                  <option value="website">Website</option>
                  <option value="bot">Bot</option>
                  <option value="phone">Phone</option>
                </select>
              </label>
              <br></br>
              <br></br>
              <input type="submit" value="Submit" />
            </form>
          </div>

          <div className="row">
            <h1>Delete a Container</h1>
            <form>
              <label>
                Container Name:ㅤ
                <input type="text" name="name" />
              </label>
              <br></br>
              <input type="submit" value="Submit" />
            </form>
          </div>


        </div>

        <br></br><br></br><br></br><br></br><br></br><br></br>

        <div className="main">

        {user.docker?.map((item) => (
          <><div className="main-item">
            <div className="main-item-header">Container {item?.id}</div>
            <div className="main-item-body">
              <div className="main-item-body-item">Type: {item?.type}</div>
              <div className="main-item-body-item">Status: {item?.status}</div>
              <div className="main-item-body-item">Manage: ㅤ <a href={"/dashboard/" + item?.id + "/container"}>Click here</a>
              </div>
              <button type="button" className="bstart">
                Start
              </button>
              <button type="button" className="bstop">
                Stop
              </button>
              <button type="button" className="brestart">
                Restart
              </button>
              <button type="button" className="bstop">
                Delete
              </button>
            </div>
          </div></>
        ))
        }
        </div>
      </header>
    </div>
  );
}

export default App;
