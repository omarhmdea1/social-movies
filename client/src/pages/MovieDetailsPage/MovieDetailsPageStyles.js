import styled from "styled-components";

import { BREAKPOINTS } from "../../constants/responsive-breakpoints";
import Container from "../../components/Container";
import Loading from "../../components/Loading";

export const Root = styled(Container)`
	& ${Loading} {
		justify-content: flex-start;
	}
`;

export const MovieInfo = styled.div`
	width: 100%;
	max-width: 500px;
	margin-bottom: var(--spacing-x4);

	& > *:not(:last-child) {
		margin-bottom: var(--spacing-x3);
	}

	@media ${BREAKPOINTS.mobileDevices} {
		& {
			text-align: center;
		}
	}
`;

export const CoverImage = styled.div`
	position: absolute;
	display: block;
	top: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 100%;
	max-height: 650px;
	background-image: url("${(props) => props.src}");
	background-repeat: no-repeat;
	background-position: top center;
	background-size: cover;
	z-index: -999;
	&::after {
		content: "";
		z-index: 5;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-image: linear-gradient(
			180deg,
			rgba(24, 25, 26, 0.9) 11.85%,
			rgba(24, 25, 26, 0.75) 28.88%,
			var(--background-color) 90%
		);
	}

	@media ${BREAKPOINTS.mobileDevices} {
		max-height: 450px;
	}
`;

export const MovieActions = styled.div`
	display: flex;
	align-items: center;

	& > *:not(:last-child) {
		margin-right: var(--spacing-x2);
	}

	@media ${BREAKPOINTS.mobileDevices} {
		& {
			flex-direction: column;
			align-items: stretch;
		}

		& > *:not(:last-child) {
			margin-right: 0;
			margin-bottom: var(--spacing-x2);
		}

		& ${Loading} {
			align-self: center;
		}
	}
`;

export const ReviewsSection = styled.div`
	margin-top: var(--spacing-x6);

	& > *:not(:last-child) {
		margin-bottom: var(--spacing-x4);
	}
`;
