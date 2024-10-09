import { createPortal } from "react-dom";

import * as Styles from "./ToastStyles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function Toast() {
	return createPortal(
		<Styles.ToastContainer
			position={toast.POSITION.BOTTOM_CENTER}
			autoClose={5000}
			hideProgressBar
			newestOnTop
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme="colored"
		/>,
		document.querySelector("#toast")
	);
}

export default Toast;
