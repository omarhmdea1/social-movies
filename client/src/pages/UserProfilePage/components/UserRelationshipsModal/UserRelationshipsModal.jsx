import { useState } from "react";
import { inject, observer } from "mobx-react";

import * as Styles from "./UserRelationshipsModalStyles";
import UserBox from "../../../../components/UserBox";
import Divider from "../../../../components/Divider";

function UserRelationshipsModal(props) {
	const { UsersStore, followersList, followingList } = props;
	const [selectedTab, setSelectedTab] = useState(props.initialTab);

	function buildTabUsersList(usersList) {
		return usersList.map((user, index) => (
			<div key={user.id}>
				<UserBox user={user} />
				{usersList.length - index > 1 && <Divider />}
			</div>
		));
	}

	return (
		<Styles.Root>
			<Styles.Header>
				<Styles.Connentions
					expand
					disabled={followingList.length === 0}
					state={selectedTab === "Following"}
					onClick={() => setSelectedTab("Following")}
				>
					Following
				</Styles.Connentions>
				<Styles.Connentions
					expand
					disabled={followersList.length === 0}
					state={selectedTab === "Followers"}
					onClick={() => setSelectedTab("Followers")}
				>
					Followers
				</Styles.Connentions>
			</Styles.Header>

			<Styles.Body>
				{selectedTab === "Following" &&
					buildTabUsersList(followingList)}
				{selectedTab === "Followers" &&
					buildTabUsersList(followersList)}
			</Styles.Body>
		</Styles.Root>
	);
}

export default inject("UsersStore")(observer(UserRelationshipsModal));
