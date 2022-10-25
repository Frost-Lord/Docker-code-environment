import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { getfile, savefile } from "../../routes/routes";

const toastOptions = {
  position: "top-right",
  autoClose: 8000,
  theme: "dark",
};

const saveCard = (event) => {
  let containerid = window.location.href.split("/")[4];

  axios.post(savefile, {
    container: containerid,
    key: "elysiumnodesglichi",
    name: event.currentTarget.id,
    data: document.getElementById("codeEditor").value,
  }).then((res) => {
    toast.success("Saved", toastOptions);  
  }).catch((err) => {
    console.log(err);
  });
};

const openCard = (event) => {
  let containerid = window.location.href.split("/")[4];

  axios.post(getfile, {
    container: containerid,
    key: "elysiumnodesglichi",
    name: event.currentTarget.id,
  }).then((res) => {
    document.getElementById("codeEditor").value = res.data;
    toast.warn("Loading file", toastOptions); 
  }).catch((err) => {
    console.log(err);
  });
};
async function loadfiledata() {
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
}
async function loadlog() {
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
}

export { openCard, saveCard, loadfiledata, loadlog };