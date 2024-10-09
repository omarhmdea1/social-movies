import { Link } from "react-router-dom";

import * as Styles from "./UserAvatarStyles";
import Avatar from "../Avatar";

function UserAvatar(props) {
	const { firstName, lastName, email, id } = props.user;
	const { date, showInfo, active, disableLink, ...rest } = props;
	return (
		<Styles.Root {...rest}>
			<Avatar
				to={`/user/${id}`}
				as={disableLink ? "span" : Link}
				active={active}
			>
				<div className="h3">{firstName[0].toUpperCase()}</div>
			</Avatar>
			{showInfo && (
				<Styles.Info>
					<Styles.NameLink
						to={`/user/${id}`}
						as={disableLink ? "span" : undefined}
						className="p-small bold"
					>
						{firstName} {lastName}
					</Styles.NameLink>
					<p>{date ?? email}</p>
				</Styles.Info>
			)}
		</Styles.Root>
	);
}

export default UserAvatar;
