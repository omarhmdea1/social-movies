import styled from "styled-components";
import { Link as OrgLink } from "react-router-dom";

import { DEVICES } from "../../constants/responsive-breakpoints";

export const Root = styled.nav`
	position: sticky;
	border-top: solid 1px var(--element-background-color);
	bottom: 0;
	height: 4.5rem;
	display: flex;
	box-shadow: var(--card-shadow);
	background-color: var(--card-background-color);

	@media (min-width: calc(${DEVICES.iPadsAndTablets} + 1px)) {
		& {
			display: none;
		}
	}
`;

export const Link = styled(OrgLink)`
	display: block;
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: var(--transition-time) ease;

	${(props) =>
		props.active &&
		`
        color: var(--primary-color);
    `}
`;
