import styled from "styled-components";

import Card from "../../components/Card";

export const Root = styled(Card)`
	& > a {
		display: block;
	}

	& > *:not(:last-child) {
		margin-bottom: var(--spacing-x2);
	}
`;
