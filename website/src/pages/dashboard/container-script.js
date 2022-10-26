import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { getfile, savefile, delfile } from "../../routes/routes";
let fileopen;

const toastOptions = {
  position: "top-right",
  autoClose: 8000,
  theme: "dark",
};


function getimg(file) {
 if (file.includes(".js")) {
  return "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/187_Js_logo_logos-512.png";
 }
}

const saveCard = async(event) => {
  let containerid = window.location.href.split("/")[4];

  await axios.post(savefile, {
    container: containerid,
    key: "elysiumnodesglichi",
    name: fileopen,
    data: document.getElementById("codeEditor").value,
  }).then((res) => {
    toast.success("Saved", toastOptions);  
  }).catch((err) => {
    console.log(err);
  });
};

const delCard = async(event) => {
  let containerid = window.location.href.split("/")[4];

  await axios.post(delfile, {
    container: containerid,
    key: "elysiumnodesglichi",
    name: fileopen,
  }).then((res) => {
    toast.warn("Deleted", toastOptions);  
  }).catch((err) => {
    console.log(err);
  });
};

const openCard = async(event) => {
  let containerid = window.location.href.split("/")[4];

  fileopen = event.currentTarget.id;


  await axios.post(getfile, {
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

export { openCard, saveCard, loadfiledata, loadlog, delCard, getimg };