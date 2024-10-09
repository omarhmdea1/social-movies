import styled from "styled-components";
import { Link } from "react-router-dom";

import Container from "../Container/Container";
import { BREAKPOINTS } from "../../constants/responsive-breakpoints";

export const Root = styled.header`
	position: sticky;
	top: 0;
	z-index: 10;
	background-color: var(--card-background-color);
	margin-bottom: var(--spacing-x4);
	box-shadow: var(--card-shadow);
	transition: background-color var(--transition-time);

	${(props) =>
		props.transparent &&
		`
        background-color: transparent;
        box-shadow: none;
    `}
`;

export const Header = styled(Container)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: var(--spacing-x2) 0;

	${(props) =>
		props.center &&
		`
		justify-content: center;
	`}
`;

export const LeftSection = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
`;

export const BackButton = styled.button`
	margin-right: var(--spacing-x1);
	align-self: stretch;
	background-color: transparent;
	animation: bounce-in 500ms ease;

	& span {
		color: white;
		font-size: 3rem;
	}
`;

export const Logo = styled(Link)`
	cursor: pointer;
	display: block;

	& > svg {
		display: block;
		height: 5rem;
	}

	@media ${BREAKPOINTS.iPadsAndTablets} {
		& > svg {
			height: 4rem;
		}
	}
`;

export const DesktopRightSection = styled.div`
	display: flex;
	align-items: center;

	& > *:not(:last-child) {
		margin-right: var(--spacing-x2);
	}

	@media ${BREAKPOINTS.iPadsAndTablets} {
		& {
			display: none;
		}
	}
`;
