import { useState, useRef, useLayoutEffect } from "react";
import { inject, observer } from "mobx-react";

import * as Styles from "./UserBoxStyles";
import UserAvatar from "../UserAvatar";
import Button from "../Button";
import Loading from "../Loading";

function UserBox(props) {
	const { UIStore, UsersStore, AuthStore, user } = props;
	const followingList = UsersStore.activeUserFollowingList;
	const activeUserId = AuthStore.data?.activeUser?.id;
	const isFollowing = checkIsFollowing();
	const [loading, setLoading] = useState(false);
	const [actionsContainerWidth, setActionsContainerWidth] = useState("auto");
	const actionsContainerRef = useRef();
	const [rootWidth, setRootWidth] = useState("auto");
	const rootRef = useRef();

	useLayoutEffect(() => {
		function updateSizes() {
			if (actionsContainerRef.current) {
				setActionsContainerWidth(
					actionsContainerRef.current.offsetWidth
				);
			}
			if (rootRef.current) {
				setRootWidth(rootRef.current.offsetWidth);
			}
		}
		updateSizes();
		window.addEventListener("resize", updateSizes);

		return () => window.removeEventListener("resize", updateSizes);
	}, [loading, isFollowing]);

	function checkIsFollowing() {
		if (!followingList) {
			return false;
		}
		return followingList.some(
			(followingUser) => followingUser.id === user.id
		);
	}

	async function unFollowUser() {
		setLoading(true);
		await UsersStore.unFollowUser(user.id);
		setLoading(false);
	}
	async function followUser() {
		setLoading(true);
		await UsersStore.followUser(user.id);
		setLoading(false);
	}

	function closeModal() {
		UIStore.closeModal();
	}

	if (user.id === activeUserId) {
		return (
			<Styles.Root ref={rootRef}>
				<UserAvatar user={user} showInfo onClick={closeModal} />
			</Styles.Root>
		);
	}

	return (
		<Styles.Root ref={rootRef}>
			<Styles.UserAvatarContainer
				width={`${rootWidth - actionsContainerWidth}px`}
			>
				<UserAvatar user={user} showInfo onClick={closeModal} />
			</Styles.UserAvatarContainer>

			<div ref={actionsContainerRef}>
				{loading && <Loading small />}

				{!loading && !isFollowing && (
					<Button onClick={followUser}>Follow</Button>
				)}
				{!loading && isFollowing && (
					<Button onClick={unFollowUser} secondary>
						Following
					</Button>
				)}
			</div>
		</Styles.Root>
	);
}

export default inject("UIStore", "UsersStore", "AuthStore")(observer(UserBox));
