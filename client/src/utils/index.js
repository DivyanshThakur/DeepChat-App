import { toast } from "react-toastify";

export const notify = {
  success: (toastId, message, autoClose = 5000) => {
    toast.success(message, { toastId, autoClose });
  },
  error: (toastId, message, autoClose = 5000) => {
    toast.error(message, { toastId, autoClose });
  },
};
