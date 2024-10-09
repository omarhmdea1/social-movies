import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { useParams } from "react-router-dom";

import { CLIENT_SIDE_REQUEST_ERROR } from "../../constants/errors";
import * as Styles from "./UserProfilePageStyles";
import GenericErrorPage from "../GenericErrorPage";
import PageNotFound from "../PageNotFound/PageNotFound";
import Container from "../../components/Container";
import { updatePageTitle } from "../../utils/metaTagsUtils";
import Loading from "../../components/Loading";
import ErrorView from "../../components/ErrorView/ErrorView";
import UserProfileContainer from "./components/UserProfileContainer";
import UserReviewsContainer from "./components/UserReviewsContainer";
import UserPlannedMovies from "./components/UserPlannedMovies/UserPlannedMovies";

function UserProfilePage(props) {
	const { UsersStore } = props;
	const { userId } = useParams();
	const { loading, errors, success, data } = UsersStore;

	const user = data?.selectedUser;
	const userReviews = data?.selectedUser?.reviews;

	useEffect(() => {
		if (user) {
			updatePageTitle(`${user.firstName} ${user.lastName}`);
		}
	}, [user]);

	useEffect(() => {
		UsersStore.getUserProfile(userId);

		return () => {
			UsersStore.clearSelectedUser();
			UsersStore.clearActionState();
		};
	}, [userId]);

	function isUserReviewsEmpty() {
		return userReviews?.length === 0;
	}

	if (errors !== null && errors === CLIENT_SIDE_REQUEST_ERROR) {
		return <GenericErrorPage />;
	}

	if (errors !== null) {
		return <PageNotFound />;
	}

	return (
		<Container
			expand
			centerHorizontally={errors || loading}
			centerVertically={errors || loading}
		>
			{loading && <Loading />}
			{errors && <ErrorView />}
			{user && (
				<>
					<UserProfileContainer userDetails={user} />
					<UserPlannedMovies />
					{!isUserReviewsEmpty() && (
						<UserReviewsContainer userReviews={userReviews} />
					)}
					{isUserReviewsEmpty() && (
						<Styles.NoReviewsMessageContainer expand>
							<p className="p-large">No reviews yet</p>
						</Styles.NoReviewsMessageContainer>
					)}
				</>
			)}
		</Container>
	);
}

export default inject("UsersStore")(observer(UserProfilePage));
