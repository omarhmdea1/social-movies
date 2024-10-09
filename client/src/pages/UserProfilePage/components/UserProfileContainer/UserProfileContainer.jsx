import * as Styles from "./UserProfileContainerStyles";
import FormatUtils from "../../../../utils/formatUtils";
import UserRelationshipsModal from "../UserRelationshipsModal";
import { observer, inject } from "mobx-react";
import Button from "../../../../components/Button";
import Loading from "../../../../components/Loading";

function UserProfileContainer(props) {
	const { UIStore, AuthStore, UsersStore } = props;
	const userDetails = {
		...props.userDetails,
		firstName: FormatUtils.capitalizeWord(props.userDetails.firstName),
		lastName: FormatUtils.capitalizeWord(props.userDetails.lastName),
	};
	const followersCount = userDetails.followersList.length;
	const followingCount = userDetails.followingList.length;
	const activeUser = AuthStore.data?.activeUser;
	const activeUserFollowingList = UsersStore.activeUserFollowingList;
	const isFollowing = checkIsFollowing();

	function openModal(initialTab) {
		UIStore.openModal({
			body: (
				<UserRelationshipsModal
					initialTab={initialTab}
					followersList={userDetails.followersList}
					followingList={userDetails.followingList}
				/>
			),
		});
	}
	function checkIsFollowing() {
		if (!activeUserFollowingList) {
			return false;
		}
		return activeUserFollowingList.some(
			(user) => user.id === userDetails.id
		);
	}

	function unFollowUser() {
		UsersStore.unFollowUser(userDetails.id);
	}
	function followUser() {
		UsersStore.followUser(userDetails.id);
	}

	return (
		<Styles.UserProfileContainer expand>
			<Styles.BigUserBox user={userDetails} />

			{activeUser.id !== userDetails.id &&
				(UsersStore.actionLoading ? (
					<Loading med />
				) : isFollowing ? (
					<Button secondary onClick={unFollowUser}>
						Following
					</Button>
				) : (
					<Button onClick={followUser}>Follow</Button>
				))}

			<Styles.ConnectionsContainer>
				<Styles.Connection
					disabled={followingCount === 0}
					onClick={() => openModal("Following")}
				>
					<div className="h4">{followingCount}</div>
					<div className="p-small">Following</div>
				</Styles.Connection>
				<Styles.Divider />
				<Styles.Connection
					disabled={followersCount === 0}
					onClick={() => openModal("Followers")}
				>
					<div className="h4">{followersCount}</div>
					<div className="p-small">Followers</div>
				</Styles.Connection>
			</Styles.ConnectionsContainer>
		</Styles.UserProfileContainer>
	);
}

export default inject(
	"UIStore",
	"AuthStore",
	"UsersStore"
)(observer(UserProfileContainer));
