import styled from "styled-components";

export const Root = styled.div`
	position: relative;
	isolation: isolate;
`;

export const DeleteBtn = styled.div`
	position: absolute;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 9999999;
	top: -1.1rem;
	left: -1.1rem;
	width: 2.2rem;
	height: 2.2rem;
	border-radius: 50%;
	background-color: var(--negative-color);
	user-select: none;

	& span {
		cursor: inherit;
		font-size: 1.4rem;
	}
`;

export const VisibilityCheckBoxContainer = styled.div`
	margin-top: var(--spacing-x1);
	display: flex;
	align-items: center;
	justify-content: flex-start;

	& label {
		display: block;
		user-select: none;
	}

	& input {
		width: 1.6rem;
		height: 1.6rem;
	}

	& > *:not(:last-child) {
		margin-right: var(--spacing-x1);
	}
`;
