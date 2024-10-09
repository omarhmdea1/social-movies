import styled from "styled-components";

const Divider = styled.div`
	display: block;
	height: 1px;
	width: 100%;
	background-color: var(--element-background-color);
	border-radius: 100px;

	${(props) =>
		props.vertical &&
		`
		height: 100%;
		width: 1px;
	`}
`;

export default Divider;
