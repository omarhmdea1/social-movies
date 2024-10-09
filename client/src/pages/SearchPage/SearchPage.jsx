import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { inject, observer } from "mobx-react";

import * as Styles from "./SearchPageStyles";
import GenericErrorPage from "../GenericErrorPage";
import { updatePageTitle } from "../../utils/metaTagsUtils";
import Loading from "../../components/Loading";
import DividedList from "../../components/DividedList";
import MovieCard from "../../components/MovieCard";
import UserBox from "../../components/UserBox";
import InfoCard from "../../components/InfoCard";
import { ReactComponent as SearchEmptyResults } from "../../assets/search-empty-results.svg";

function SearchPage(props) {
	const { MoviesStore, UsersStore } = props;
	const params = new URLSearchParams(useLocation().search);
	const query = params.get("query");
	const navigate = useNavigate();

	if (query === null || query?.trim().length === 0) {
		navigate("/", { replace: true });
	}

	useEffect(() => {
		updatePageTitle("Search results");
	}, []);

	useEffect(() => {
		UsersStore.searchUser(query);
		MoviesStore.searchMovie(query);
	}, [query]);

	function IsSuccess() {
		return (
			MoviesStore.data?.searchResults && UsersStore.data?.searchResults
		);
	}

	function isError() {
		return MoviesStore.errors || UsersStore.errors;
	}

	function isLoading() {
		return MoviesStore.loading || UsersStore.loading;
	}

	function isResultsEmpty() {
		const isMoviesEmpty =
			MoviesStore.data?.searchResults &&
			MoviesStore.data.searchResults.length === 0;
		const isUsersEmpty =
			UsersStore.data?.searchResults &&
			UsersStore.data.searchResults.length === 0;
		return isMoviesEmpty && isUsersEmpty;
	}

	if (isError()) {
		return <GenericErrorPage />;
	}

	if (isResultsEmpty()) {
		return (
			<InfoCard
				title="No results found."
				description="Please make sure your words are spelled correctly."
				Image={{ type: "svg", SVG: SearchEmptyResults }}
			/>
		);
	}

	return (
		<Styles.Root
			expand
			centerVertically={isError() || isLoading()}
			centerHorizontally={isError() || isLoading()}
		>
			{isLoading() && <Loading />}
			{IsSuccess() && (
				<>
					<DividedList
						resultsList={UsersStore.data.searchResults}
						title="Users"
						buildComponent={(user) => <UserBox user={user} />}
					/>

					<DividedList
						resultsList={MoviesStore.data.searchResults}
						title="Movies"
						buildComponent={(movie) => <MovieCard movie={movie} />}
					/>
				</>
			)}
		</Styles.Root>
	);
}

export default inject("MoviesStore", "UsersStore")(observer(SearchPage));
