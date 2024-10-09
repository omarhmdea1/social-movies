import { useEffect } from "react";
import { inject, observer } from "mobx-react";

import { CLIENT_SIDE_REQUEST_ERROR } from "../../constants/errors";
import * as Styles from "./HomePageStyles";
import GenericErrorPage from "../GenericErrorPage";
import { updatePageTitle } from "../../utils/metaTagsUtils";
import Container from "../../components/Container";
import Loading from "../../components/Loading";
import ErrorView from "../../components/ErrorView";
import ReviewCard from "../../components/ReviewCard";
import InfoCard from "../../components/InfoCard";
import { ReactComponent as GetConnected } from "../../assets/get-connected.svg";

function HomePage(props) {
	const { UsersStore } = props;
	const { loading, errors, success, data } = UsersStore;

	useEffect(() => {
		UsersStore.getFeed();
		updatePageTitle("Social Movies", { withSiteName: false });
	}, []);

	if (data?.feed?.length === 0) {
		return (
			<InfoCard
				title="Welcome to your timeline"
				description="it's empty now, but it won't be for long. Start following people and you'll see their reviews show up here."
				Image={{ type: "svg", SVG: GetConnected }}
				btnTitle="Get Started"
				callback={() => {}}
			/>
		);
	}

	if (errors !== null && errors === CLIENT_SIDE_REQUEST_ERROR) {
		return <GenericErrorPage />;
	}

	return (
		<Container
			expand
			centerHorizontally={loading || errors}
			centerVertically={loading || errors}
		>
			{loading && <Loading />}

			{errors && (
				<ErrorView errorMessage={errors[0]?.message ?? errors} />
			)}

			{data?.feed && (
				<>
					<Styles.ReviewsSection>
						{data.feed.map((review) => (
							<ReviewCard key={review.id} review={review} />
						))}
					</Styles.ReviewsSection>
				</>
			)}
		</Container>
	);
}

export default inject("UsersStore")(observer(HomePage));
