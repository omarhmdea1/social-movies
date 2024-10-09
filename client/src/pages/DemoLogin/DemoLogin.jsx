import { inject, observer } from "mobx-react";
import { Navigate } from "react-router-dom";

import { CLIENT_SIDE_REQUEST_ERROR } from "../../constants/errors";
import Container from "../..//components/Container";
import GenericErrorPage from "../GenericErrorPage";
import ErrorView from "../../components/ErrorView";
import Loading from "../../components/Loading";

function DemoLogin(props) {
	const { AuthStore } = props;
	const { loading, data, errors } = AuthStore;

	if (loading) {
		return (
			<Container expand centerHorizontally centerVertically>
				<Loading />
			</Container>
		);
	}

	if (errors !== null && errors === CLIENT_SIDE_REQUEST_ERROR) {
		return <GenericErrorPage />;
	}

	if (errors) {
		return (
			<Container expand centerHorizontally centerVertically>
				<ErrorView errorMessage="Demo account is disabled at this time" />
			</Container>
		);
	}

	if (data?.activeUser) {
		return <Navigate to="/" replace />;
	} else {
		AuthStore.demoLogin();
	}
}

export default inject("AuthStore")(observer(DemoLogin));
