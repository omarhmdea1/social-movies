import styled from "styled-components";

import { DEVICES } from "../../../../constants/responsive-breakpoints";
import Card from "../../../Card";

export const Root = styled.div`
	@media (min-width: calc(${DEVICES.iPadsAndTablets} + 1px)) {
		& {
			display: none;
		}
	}
`;

export const Form = styled(Card)`
	display: flex;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	border-radius: 0;
	opacity: 0;
	transform: translateY(-50px);
	pointer-events: none;
	transition: var(--transition-time) ease;

	& > *:not(:last-child) {
		margin-right: 1rem;
	}

	& > *:not(input) {
		flex-shrink: 0;
	}

	& > button {
		color: white;
		background-color: var(--primary-color);
	}

	${(props) =>
		props.active &&
		`
        opacity: 1;
        transform: translateY(0);
        pointer-events: all;
    `}
`;
