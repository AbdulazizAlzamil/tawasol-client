import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { hideAlert } from "../redux/modules/alerts";

const Alert = () => {
  const alert = useSelector((state) => state.alerts);
  const dispatch = useDispatch();
  useEffect(() => {
    if (alert.show && alert.msg) {
      if (alert.type === "error") {
        toast.error(alert.msg, { onClose: () => dispatch(hideAlert()) });
      } else if (alert.type === "success") {
        toast.success(alert.msg, { onClose: () => dispatch(hideAlert()) });
      } else {
        toast(alert.msg, { onClose: () => dispatch(hideAlert()) });
      }
    }
  }, [alert, dispatch]);
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default Alert;
