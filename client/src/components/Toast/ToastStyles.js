import styled from "styled-components";

import { BREAKPOINTS } from "../../constants/responsive-breakpoints";
import { ToastContainer as OrgToastContainer } from "react-toastify";

export const ToastContainer = styled(OrgToastContainer)`
	--toastify-color-light: #fff;
	--toastify-color-dark: var(--card-background-color);
	--toastify-color-info: #3498db;
	--toastify-color-success: var(--positive-color);
	--toastify-color-warning: #f1c40f;
	--toastify-color-error: var(--negative-color);
	--toastify-text-color-dark: var(--text-color);
	--toastify-toast-width: 500px;

	z-index: 30;
	font-size: 1.6rem;

	@media ${BREAKPOINTS.iPadsAndTablets} {
		& {
			margin-bottom: 4.5rem;
		}
	}
`;
