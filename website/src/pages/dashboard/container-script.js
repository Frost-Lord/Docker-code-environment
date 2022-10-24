import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const toastOptions = {
  position: "top-right",
  autoClose: 8000,
  theme: "dark",
};

function savepage() {
  toast.success("Page saved!", toastOptions);
}

export { savepage };