import * as Styles from "./BigUserBoxStyles";

function BigUserBox(props) {
	const { user, className } = props;
	const { firstName, lastName, email } = user;

	return (
		<Styles.Root className={className}>
			<Styles.Avatar>
				<div className="bold">{firstName[0].toUpperCase()}</div>
			</Styles.Avatar>
			<Styles.UserName className="h3">
				{firstName + " " + lastName}
			</Styles.UserName>
			<Styles.UserEmail className="h6 regular">{email}</Styles.UserEmail>
		</Styles.Root>
	);
}

export default BigUserBox;
