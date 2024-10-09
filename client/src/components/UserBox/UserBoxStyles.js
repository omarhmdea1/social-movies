import styled from "styled-components";

export const Root = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	& > *:first-child {
		margin-right: var(--spacing-x1);
	}
`;

export const UserAvatarContainer = styled.div`
	width: ${(props) => props.width};
	overflow: hidden;
`;
