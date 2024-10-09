import styled from "styled-components";

import { BREAKPOINTS } from "../../constants/responsive-breakpoints";

const Avatar = styled.div`
	display: block;
	cursor: pointer;
	width: 5rem;
	height: 5rem;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--element-background-color);
	box-shadow: var(--card-shadow);
	transition: var(--transition-time);

	& > * {
		user-select: none;
	}

	${(props) =>
		props.active &&
		`
		background-color: var(--washed-primary-color);
		color: var(--primary-color);
	`}

	@media ${BREAKPOINTS.iPadsAndTablets} {
		& {
			width: 4.5rem;
			height: 4.5rem;
			${(props) =>
				props.small &&
				`
				width: 4rem;
				height: 4rem;
			`}
		}
	}
`;

export default Avatar;
