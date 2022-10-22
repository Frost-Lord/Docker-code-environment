import "./container.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { dockerlogs } from "../../routes/routes";

function App() {
  const navigate = useNavigate();
  const [user, setuser] = useState([]);
  const [logs, setlogs] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("LOCALHOST_KEY")) {
      //navigate("/");
    }
  }, []);

  useEffect(() => {
    setuser(JSON.parse(localStorage.getItem("LOCALHOST_KEY")));
  }, []);

  useEffect(() => {
    let containerid = window.location.href.split("/")[4];
    const interval = setInterval(() => {
      axios.post(dockerlogs, {
        id: containerid,
        key: "elysiumnodesglichi",
        }).then((res) => {
          setlogs(res.data);
          console.log(res.data);
        }).catch((err) => {
          console.log(err);
        });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">

        <div className="console">
        <h2 className="files-title">Logs</h2>
          <div className="console-inner">
            <div className="console-content">
              {logs} 
            </div>
          </div>
        </div>


        <div className="files">
          <h2 className="files-title">Files</h2>
          <div className="files-inner">
            <div className="files-content">

            </div>
          </div>
        </div>

      </header>
    </div>
  );
}

export default App;
