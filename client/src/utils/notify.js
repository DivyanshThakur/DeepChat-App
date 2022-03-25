import { toast } from "react-toastify";

const notify = {
  success: (toastId, message, autoClose = 5000) => {
    toast.success(message, { toastId, autoClose, theme: "colored" });
  },
  error: (toastId, message, autoClose = 5000) => {
    toast.error(message, { toastId, autoClose, theme: "colored" });
  },
};

export default notify;
