import { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { useParams } from "react-router-dom";

import { CLIENT_SIDE_REQUEST_ERROR } from "../../constants/errors";
import * as Styles from "./MovieDetailsPageStyles";
import GenericErrorPage from "../GenericErrorPage";
import PageNotFound from "../PageNotFound/PageNotFound";
import { updatePageTitle } from "../../utils/metaTagsUtils";
import MovieRatings from "./components/MovieRatings";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import ReviewCard from "../../components/ReviewCard";
import AddReviewForm from "./components/AddReviewForm";
import PlannedMovieForm from "./components/PlannedMovieForm";

function MovieDetailsPage(props) {
	const { movieId } = useParams();
	const { MoviesStore, UsersStore, UIStore } = props;
	const {
		loading,
		errors,
		success,
		data,
		actionLoading,
		actionErrors,
		actionSuccess,
	} = MoviesStore;
	const movie = data?.selectedMovie;

	useEffect(() => {
		UIStore.setTransparentHeader(true);
		MoviesStore.getMovieDetails(movieId);

		return () => {
			MoviesStore.clearSelectedMovie();
			UsersStore.clearActionState();
			UIStore.setTransparentHeader(false);
		};
	}, []);

	useEffect(() => {
		if (movie) {
			updatePageTitle(movie.title);
		}
	}, [movie]);

	async function addReview() {
		UIStore.freezeModal();
		await MoviesStore.addReview();
		UIStore.unFreezeModal();
		if (MoviesStore.actionSuccess) {
			UIStore.closeModal();
		}
	}

	function deleteReview() {
		MoviesStore.deleteReview(movie.activeUserReview.id);
	}

	function openAddReviewModal() {
		UIStore.openModal({
			isConfirmation: true,
			onConfirm: addReview,
			body: <AddReviewForm />,
		});
	}

	async function addPlannedMovie() {
		UIStore.freezeModal();
		await UsersStore.addPlannedMovie(movie.IMDBId);
		UIStore.unFreezeModal();
		if (UsersStore.actionSuccess) {
			UIStore.closeModal();
		}
	}

	function deletePlannedMovie(plannedMovieId) {
		UsersStore.deletePlannedMovie(plannedMovieId);
	}

	function openPlannedMovieForm() {
		UIStore.openModal({
			isConfirmation: true,
			onConfirm: addPlannedMovie,
			body: <PlannedMovieForm movie={movie} />,
		});
	}

	function getMovieFromPlannedList() {
		if (!UsersStore.activeUserPlannedMovies) {
			return false;
		}
		return UsersStore.activeUserPlannedMovies.find(
			(plannedMovie) => plannedMovie.movie.id === movie?.IMDBId
		);
	}
	const plannedMovie = getMovieFromPlannedList();

	if (errors !== null && errors === CLIENT_SIDE_REQUEST_ERROR) {
		return <GenericErrorPage />;
	}

	if (errors !== null) {
		return <PageNotFound />;
	}

	return (
		<Styles.Root
			expand
			centerHorizontally={loading || errors}
			centerVertically={loading || errors}
		>
			{loading && <Loading />}

			{movie && (
				<>
					<Styles.CoverImage src={movie.coverImageURL} />
					<Styles.MovieInfo>
						<h1>{movie.title}</h1>
						<p className="p-large">{movie.overview}</p>
						<MovieRatings
							IMDBRating={movie.IMDBRating}
							appRating={movie.appRating}
							activeUserRating={movie.activeUserReview?.rating}
						/>
					</Styles.MovieInfo>

					<Styles.MovieActions>
						{!movie.activeUserReview && (
							<Button onClick={openAddReviewModal}>
								Add Review
							</Button>
						)}

						{movie.activeUserReview &&
							(actionLoading ? (
								<Loading med />
							) : (
								<Button negative onClick={deleteReview}>
									Delete Review
								</Button>
							))}

						{plannedMovie &&
							(UsersStore.actionLoading ? (
								<Loading med />
							) : (
								<Button
									negative
									onClick={() =>
										deletePlannedMovie(plannedMovie.id)
									}
								>
									Delete from Planned List
								</Button>
							))}

						{!plannedMovie && (
							<Button secondary onClick={openPlannedMovieForm}>
								Add to Planned List
							</Button>
						)}
					</Styles.MovieActions>

					<Styles.ReviewsSection>
						{movie.reviews.map((review) => (
							<ReviewCard
								key={review.id}
								review={review}
								activeUserReview={movie.activeUserReview}
								hideMovie
							/>
						))}
					</Styles.ReviewsSection>
				</>
			)}
		</Styles.Root>
	);
}

export default inject(
	"MoviesStore",
	"UsersStore",
	"UIStore"
)(observer(MovieDetailsPage));
