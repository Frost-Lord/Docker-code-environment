import "./container.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { dockerlogs, allfiles } from "../../routes/routes";
import {openCard,saveCard,loadlog,loadfiledata, delCard, getimg} from "./container-script";
import { ToastContainer } from "react-toastify";


function App() {
  const navigate = useNavigate();
  const [user, setuser] = useState([]);
  const [logs, setlogs] = useState([]);
  const [files, setfiles] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("LOCALHOST_KEY")) {
      navigate("/login");
    }
    loadlog()
    loadfiledata()

    setuser(JSON.parse(localStorage.getItem("LOCALHOST_KEY")));
}, []);

  useEffect(() => {
    let containerid = window.location.href.split("/")[4];
    const interval = setInterval(() => {
      axios
        .post(dockerlogs, {
          id: containerid,
          key: "elysiumnodesglichi",
        })
        .then((res) => {
          setlogs(res.data);
          let codeEditor = document.getElementById('codelog');
          codeEditor.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let containerid = window.location.href.split("/")[4];
    const interval = setInterval(() => {
      axios
        .post(allfiles, {
          container: containerid,
          key: "elysiumnodesglichi",
        })
        .then((res) => {
          setfiles(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div className="App">
      <header className="App-header">
        <div className="console">
          <h2 className="files-title">Logs</h2>
          <div className="console-inner">
          <p>
              <div className="counter" id="lineCounter2" wrap="off">
                1.
              </div>
              <div className="codelog" id="codelog" wrap="off">{logs}</div>
            </p>

          </div>
        </div>

        <div className="file">
          <h2 className="files-title">File name <button className="savefile" onClick={saveCard}>
            Save
          </button></h2>
          <div className="file-inner">
            <p>
              <textarea className="counter" id="lineCounter" wrap="off">
                1.
              </textarea>
              <textarea className="codeEditor" id="codeEditor" wrap="off"></textarea>
            </p>
          </div>
        </div>

        <div className="files">
          <h2 className="files-title">Files</h2>
          <div className="files-inner">
            <div className="files-content"></div>
            {files.map((file) => (
    <div class="container">
    <div class="image">
      <img src={getimg(file)} />
     </div>
    <div class="text">
      <h1>{file}</h1>
    </div>
  </div>
            ))}
          </div>
        </div>
      </header>
    </div>
    <ToastContainer />
    </>
  );
}

export default App;
