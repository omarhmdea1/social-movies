import styled from "styled-components";
import { BREAKPOINTS } from "../../../../constants/responsive-breakpoints";

export const Root = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;

	& > *:not(:last-child) {
		margin-right: var(--spacing-x2);
	}

	@media ${BREAKPOINTS.mobileDevices} {
		& {
			justify-content: center;
		}
	}
`;
