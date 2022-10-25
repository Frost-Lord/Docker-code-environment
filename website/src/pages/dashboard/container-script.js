import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { getfile } from "../../routes/routes";

const toastOptions = {
  position: "top-right",
  autoClose: 8000,
  theme: "dark",
};

function savepage() {
  
}

const openCard = (event) => {
  console.log(event.currentTarget.id);
  let containerid = window.location.href.split("/")[4];

  axios.post(getfile, {
    container: containerid,
    key: "elysiumnodesglichi",
    name: event.currentTarget.id,
  }).then((res) => {
    document.getElementById("codeEditor").value = res.data;
  }).catch((err) => {
    console.log(err);
  });
  
};

export { openCard, savepage, toastOptions };