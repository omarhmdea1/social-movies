import styled from "styled-components";

import { BREAKPOINTS } from "../../constants/responsive-breakpoints";
import Card from "../Card";

export const Root = styled(Card)`
	padding: var(--spacing-x3);
	max-width: 500px;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;

	& > * {
		text-align: center;
	}

	& p {
		margin-top: var(--spacing-x2);
	}

	& button {
		margin-top: var(--spacing-x2);
	}
`;

export const ImageContainer = styled.div`
	margin-bottom: var(--spacing-x3);
	width: 100%;
	max-width: 250px;

	& img {
		width: 100%;
		object-fit: fill;
	}

	& svg {
		width: 100%;
	}

	@media ${BREAKPOINTS.iPadsAndTablets} {
		& {
			max-width: 220px;
		}
	}

	@media ${BREAKPOINTS.mobileDevices} {
		& {
			max-width: 200px;
		}
	}
`;
