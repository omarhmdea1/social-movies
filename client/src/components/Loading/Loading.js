import styled from "styled-components";

import { BREAKPOINTS } from "../../constants/responsive-breakpoints";

const Loading = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	animation: fade-in 800ms;

	&::after {
		content: "";
		display: block;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		border: 6px solid #fff;
		border-color: var(--primary-color) transparent var(--primary-color)
			transparent;
		animation: lds-dual-ring 700ms linear infinite;

		${(props) =>
			props.med &&
			`
				height: 40px;
				width: 40px;
				border-width: 5px;
		`}

		${(props) =>
			props.small &&
			`
				height: 32px;
				width: 32px;
				border-width: 4px;
		`}
	}

	@media ${BREAKPOINTS.iPadsAndTablets} {
		&::after {
			height: 44px;
			width: 44px;
			border-width: 5px;

			${(props) =>
				props.med &&
				`
					height: 36px;
					width: 36px;
					border-width: 4px;
			`}

			${(props) =>
				props.small &&
				`
					height: 28px;
					width: 28px;
					border-width: 4px;
			`}
		}
	}

	@keyframes lds-dual-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

export default Loading;
