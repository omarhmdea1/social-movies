import styled from "styled-components";

import { BREAKPOINTS } from "../../../../constants/responsive-breakpoints";

import Button from "../../../../components/Button";
import Card from "../../../../components/Card";
import Loading from "../../../../components/Loading";
import OrgBigUserBox from "../../../../components/BigUserBox";

export const UserProfileContainer = styled(Card)`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;

	& > button,
	& > ${Loading} {
		margin-bottom: var(--spacing-x2);
	}

	@media ${BREAKPOINTS.mobileDevices} {
		& > button {
			width: 100%;
		}
	}
`;

export const BigUserBox = styled(OrgBigUserBox)`
	margin-bottom: var(--spacing-x3);
`;

export const ConnectionsContainer = styled.div`
	display: flex;
	align-items: stretch;
	justify-content: center;
`;

export const Connection = styled(Button)`
	cursor: default;
	text-align: center;
	background-color: transparent;
	border-radius: 0;
	box-shadow: none;
	padding: 0;

	& div:first-child {
		margin-bottom: 1rem;
	}
	& div:last-child {
		transition: var(--transition-time);
		color: var(--secondary-text-color);
	}

	${(props) =>
		!props.disabled &&
		`
			cursor: pointer;
			&:hover div:last-child {
				color: var(--primary-color);
			}
		`}
`;

export const Divider = styled.div`
	display: block;
	width: 1px;
	background-color: var(--element-background-color);
	border-radius: 100px;
	margin: 0 var(--spacing-x4);
`;
