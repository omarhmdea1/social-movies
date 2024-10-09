import { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavigationHistoryUpdater from "./utility-components/NavigationHistoryUpdater";
import Modal from "./components/Modal";
import Toast from "./components/Toast";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer/Footer";
import MobileBottomNavigation from "./components/MobileBottomNavigation";
import AuthPage from "./pages/AuthPage";
import UserProfilePage from "./pages/UserProfilePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";
import DemoLogin from "./pages/DemoLogin";
import PageNotFound from "./pages/PageNotFound";
import MobileSettingsPage from "./pages/MobileSettingsPage";

function App(props) {
	const { AuthStore, UsersStore } = props;
	const activeUser = AuthStore.data?.activeUser;

	useEffect(() => {
		AuthStore.getUserData();
	}, []);

	useEffect(() => {
		if (activeUser) {
			UsersStore.getActiveUserDynamicData();
		}
	}, [activeUser]);

	return (
		<Router>
			<NavigationHistoryUpdater />
			<Modal />
			<Toast />
			<Header />
			<Routes>
				<Route
					path="/register"
					element={
						<ProtectedRoute
							inAuth
							element={<AuthPage formType="Register" />}
						/>
					}
				/>
				<Route
					path="/login"
					element={
						<ProtectedRoute
							inAuth
							element={<AuthPage formType="Login" />}
						/>
					}
				/>
				<Route path="/demo" element={<DemoLogin />} />
				<Route
					path="/"
					element={<ProtectedRoute element={<HomePage />} />}
				/>
				<Route
					path="/user/:userId"
					element={<ProtectedRoute element={<UserProfilePage />} />}
				/>
				<Route
					path="/movie/:movieId"
					element={<ProtectedRoute element={<MovieDetailsPage />} />}
				/>
				<Route
					path="/search"
					element={<ProtectedRoute element={<SearchPage />} />}
				/>
				<Route
					path="/mobile-settings"
					element={
						<ProtectedRoute element={<MobileSettingsPage />} />
					}
				/>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
			<Footer />
			<MobileBottomNavigation />
		</Router>
	);
}

export default inject("AuthStore", "UsersStore")(observer(App));
