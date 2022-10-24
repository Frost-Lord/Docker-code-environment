import "./container.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { dockerlogs } from "../../routes/routes";
import { savepage } from "./container-script";

function App() {
  const navigate = useNavigate();
  const [user, setuser] = useState([]);
  const [logs, setlogs] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("LOCALHOST_KEY")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
  let codeEditor = document.getElementById('codeEditor');
  let lineCounter = document.getElementById('lineCounter');


codeEditor.addEventListener('scroll', () => {
  lineCounter.scrollTop = codeEditor.scrollTop;
  lineCounter.scrollLeft = codeEditor.scrollLeft;
});
codeEditor?.addEventListener('keydown', (e) => {
let { keyCode } = e;
let { value, selectionStart, selectionEnd } = codeEditor;
if (keyCode === 9) {  // TAB = 9
  e.preventDefault();
  codeEditor.value = value.slice(0, selectionStart) + '\t' + value.slice(selectionEnd);
  codeEditor.setSelectionRange(selectionStart+2, selectionStart+2)
}
});
var lineCountCache = 0;
function line_counter() {
    var lineCount = codeEditor.value.split('\n').length;
    // eslint-disable-next-line no-array-constructor
    var outarr = new Array();
    // eslint-disable-next-line eqeqeq
    if (lineCountCache != lineCount) {
       for (var x = 0; x < lineCount; x++) {
          outarr[x] = (x + 1) + '.';
       }
       lineCounter.value = outarr.join('\n');
    }
    lineCountCache = lineCount;
}
codeEditor?.addEventListener('input', () => {
  line_counter();
});
  }, []);

  useEffect(() => {
    let codeEditor = document.getElementById('codelog');
    let lineCounter = document.getElementById('lineCounter2');
  
  
  codeEditor.addEventListener('scroll', () => {
    lineCounter.scrollTop = codeEditor.scrollTop;
    lineCounter.scrollLeft = codeEditor.scrollLeft;
  });
  codeEditor?.addEventListener('keydown', (e) => {
  let { keyCode } = e;
  let { value, selectionStart, selectionEnd } = codeEditor;
  if (keyCode === 9) {  // TAB = 9
    e.preventDefault();
    codeEditor.value = value.slice(0, selectionStart) + '\t' + value.slice(selectionEnd);
    codeEditor.setSelectionRange(selectionStart+2, selectionStart+2)
  }
  });
  var lineCountCache = 0;
  function line_counter() {
      var lineCount = codeEditor.value.split('\n').length;
      // eslint-disable-next-line no-array-constructor
      var outarr = new Array();
      // eslint-disable-next-line eqeqeq
      if (lineCountCache != lineCount) {
         for (var x = 0; x < lineCount; x++) {
            outarr[x] = (x + 1) + '.';
         }
         lineCounter.value = outarr.join('\n');
      }
      lineCountCache = lineCount;
  }
  codeEditor?.addEventListener('input', () => {
    line_counter();
  });
    }, []);

  useEffect(() => {
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
          console.log(res.data);

          let codeEditor = document.getElementById('codelog');
          codeEditor.value = res.data;
        })
        .catch((err) => {
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
          <p>
              <div className="counter" id="lineCounter2" wrap="off">
                1.
              </div>
              <div className="codelog" id="codelog" wrap="off">{logs}</div>
            </p>

          </div>
        </div>

        <div className="file">
          <h2 className="files-title">File name <button className="save" onClick={savepage}>
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
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
