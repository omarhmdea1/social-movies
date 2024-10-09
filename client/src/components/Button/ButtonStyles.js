import styled from "styled-components";

import { BREAKPOINTS } from "../../constants/responsive-breakpoints";

const StyledButton = styled.button`
	cursor: pointer;
	display: block;
	padding: var(--spacing-x1-5) var(--spacing-x3);
	border: none;
	background-color: var(--primary-color);
	color: var(--text-color);
	box-shadow: var(--card-shadow);
	text-align: center;
	${(props) => props.expand && "width: 100%;"}
	border-radius: var(--border-radius);

	${(props) =>
		props.secondary &&
		`
        background-color: var(--element-background-color);
    `}

	${(props) =>
		props.negative &&
		`
        background-color: var(--negative-color);
    `}

	@media ${BREAKPOINTS.iPadsAndTablets} {
		& {
			padding: var(--spacing-x2) var(--spacing-x3);
		}
	}
`;

export default StyledButton;
