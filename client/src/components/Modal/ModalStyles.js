import styled from "styled-components";

import { BREAKPOINT } from "../Container";
import Card from "../Card";

export const Root = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: rgba(26, 26, 26, 0.8);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 20;
	opacity: 0;
	pointer-events: none;
	transition: var(--transition-time) ease;

	${(props) =>
		props.active &&
		`
        opacity: 1;
        pointer-events: all;
    `}

	@media ${BREAKPOINT} {
		padding: 0 2rem;
	}
`;

export const Modal = styled(Card)`
	padding: 0;
	max-width: 500px;
	width: 100%;
	overflow: hidden;
	transition: var(--transition-time) ease;
	transform: translateY(-50px);
	opacity: 0;

	& > * {
		padding-left: var(--spacing-x2);
		padding-right: var(--spacing-x2);
	}

	& > *:first-child {
		padding-top: var(--spacing-x2);
		padding-bottom: var(--spacing-x2);
	}

	& > *:not(:first-child) {
		padding-top: var(--spacing-x2);
	}

	& > *:nth-child(2) {
		padding-top: 0;
	}

	& > *:last-child {
		padding-bottom: var(--spacing-x2);
	}

	${(props) =>
		props.active &&
		`
        transform: translateY(0);
        opacity: 1;
    `}
`;

export const ModalHeader = styled.div`
	position: sticky;
	top: 0;
	background-color: var(--card-background-color);
	display: flex;
	justify-content: end;
	align-items: flex-start;
`;

export const CloseBtn = styled.div`
	cursor: pointer;
	height: 4rem;
	width: 4rem;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: var(--element-background-color);
	border-radius: 50%;

	& > span {
		color: var(--text-color);
		font-size: 2rem;
	}
`;

export const ModalBody = styled.div`
	max-height: 500px;
	overflow-x: hidden;
	overflow-y: auto;

	& > *:not(:last-child) {
		margin-bottom: var(--spacing-x2);
	}
`;

export const ModalFooter = styled.div`
	position: sticky;
	bottom: 0;
	display: flex;
	justify-content: end;
	align-items: center;

	& > *:not(:last-child) {
		margin-right: var(--spacing-x2);
	}
`;
