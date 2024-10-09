import styled from "styled-components";

export const Root = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const Avatar = styled.div`
	display: block;
	width: 10rem;
	height: 10rem;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--element-background-color);
	box-shadow: var(--card-shadow);
	transition: var(--transition-time);
	font-size: 4.8rem;
	margin-bottom: var(--spacing-x1);
`;

export const UserName = styled.h1`
	margin-bottom: 0.5rem;
`;

export const UserEmail = styled.div`
	color: var(--secondary-text-color);
`;
