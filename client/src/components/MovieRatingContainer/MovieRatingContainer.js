import styled from "styled-components";

import { BREAKPOINTS } from "../../constants/responsive-breakpoints";

const MovieRatingContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;

	& > *:first-child {
		margin-right: var(--spacing-x1);
	}

	& svg {
		width: auto;
		height: 1.5rem;
		${(props) =>
			props.big &&
			`
			height: 2rem;
		`}
	}

	& span {
		color: var(--primary-color);
		font-size: 2.2rem;
		${(props) =>
			props.big &&
			`
			font-size: 2.6rem;
		`}
	}

	@media ${BREAKPOINTS.iPadsAndTablets} {
		& span {
			font-size: 2rem;
			${(props) =>
				props.big &&
				`
					font-size: 2.2rem;
			`}
		}
	}
`;

export default MovieRatingContainer;
