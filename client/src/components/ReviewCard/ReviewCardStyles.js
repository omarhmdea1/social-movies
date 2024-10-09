import styled from "styled-components";

import { BREAKPOINTS } from "../../constants/responsive-breakpoints";

import Card from "../Card";

export const Root = styled(Card)`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;

	@media ${BREAKPOINTS.mobileDevices} {
		& {
			flex-direction: column;
		}
	}
`;

export const LeftSection = styled.div`
	margin-right: var(--spacing-x2);

	@media ${BREAKPOINTS.mobileDevices} {
		& {
			margin-right: 0;
			margin-top: var(--spacing-x2);
			order: 2;
		}
	}
`;

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`;

export const RightSection = styled.div`
	flex-grow: 1;
	& > *:not(:last-child) {
		margin-bottom: var(--spacing-x2);
	}
`;
