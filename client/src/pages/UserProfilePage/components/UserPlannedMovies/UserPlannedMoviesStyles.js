import styled from "styled-components";

import { BREAKPOINTS } from "../../../../constants/responsive-breakpoints";
import Card from "../../../../components/Card";

export const Root = styled(Card)`
	margin-top: var(--spacing-x4);
`;

export const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: var(--spacing-x2);
`;

export const HeaderRightSide = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`;

export const HeaderActions = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;

	& > *:not(:last-child) {
		margin-right: var(--spacing-x2);
	}
`;

export const MoviesList = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: var(--spacing-x2);

	@media ${BREAKPOINTS.smallScreensAndLaptops} {
		& {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media ${BREAKPOINTS.iPadsAndTablets} {
		& {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media ${BREAKPOINTS.mobileDevices} {
		& {
			grid-template-columns: repeat(1, 1fr);
		}
	}
`;

export const MovieDraggingState = styled.div`
	transition: var(--transition-time);
	border-radius: var(--border-radius);

	& * {
		cursor: grab;
	}

	& *:is(.clickable, input, label) {
		cursor: default;
	}

	${(props) =>
		props.isDragging &&
		`	& *:not(.clickable, input, label) {
				cursor: grabbing;
			}
			cursor: grabbing;
			background-color: var(--washed-primary-color-rgb);
			box-shadow: 0 0 0 10px var(--washed-primary-color-rgb);
		`}
`;
