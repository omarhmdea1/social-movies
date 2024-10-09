import styled from "styled-components";
import { Link } from "react-router-dom";

export const Root = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	& > *:first-child {
		flex-shrink: 0;
	}
`;

export const Info = styled.div`
	margin-left: var(--spacing-x1-5);

	& > p:last-child {
		margin-top: 0.5rem;
		font-weight: var(--font-weight-regular);
		font-size: 1.4rem;
		color: var(--secondary-text-color);
	}
`;

// just to use the `as` prop
export const NameLink = styled(Link)``;
