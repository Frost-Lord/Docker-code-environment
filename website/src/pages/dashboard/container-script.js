import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { getfile, savefile, delfile } from "../../routes/routes";
let fileopen;

const toastOptions = {
  position: "top-right",
  autoClose: 1000,
  theme: "dark",
};


function getimg(file) {

  if (file.includes(".json")) {
    return "https://cdn-icons-png.flaticon.com/512/136/136525.png";
  } else if (file.includes(".js")) {
  return "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/187_Js_logo_logos-512.png";
 } else if (file.includes(".html")) {
  return "https://www.freepnglogos.com/uploads/html5-logo-png/html5-logo-html-logo-0.png";
 } else if (file.includes(".css")) {
  return "https://www.freepnglogos.com/uploads/html5-logo-png/html5-logo-css-logo-png-transparent-svg-vector-bie-supply-9.png";
 } else if (file.includes(".py")) {
  return "https://i.postimg.cc/zfqjxY13/python.png";
 } else if (!file.includes(".")) {
  return "https://icons.iconarchive.com/icons/paomedia/small-n-flat/512/folder-icon.png"
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
    toast.success("Loaded File", toastOptions); 


    var number_of_elements = document.getElementsByClassName('containerfiles').length;
    var i =0;
while (i<number_of_elements) {
  document.getElementsByClassName('containerfiles')[i].style.backgroundColor= '#1c2333';
  //selecting each class and changing it's backgroundcolor
  i++;
} 


    document.getElementById(fileopen).style.backgroundColor="#0079f2";


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