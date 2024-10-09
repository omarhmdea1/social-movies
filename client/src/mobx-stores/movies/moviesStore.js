import { action, makeObservable, observable } from "mobx";

import BaseStore from "../baseStore";
import MoviesService from "../../services/moviesService";
import authRequest from "../../utils/authRequest";

class MoviesStore extends BaseStore {
	reviewFormData = {};

	constructor(props) {
		super(props);
		makeObservable(this, {
			reviewFormData: observable,
			getMovieDetails: action,
			clearSelectedMovie: action,
			searchMovie: action,
			updateReviewFormData: action,
			addReview: action,
			deleteReview: action,
			clearReviewFormData: action,
		});
	}

	async getMovieDetails(movieId) {
		try {
			this.setLoading();
			const response = await authRequest(() =>
				MoviesService.getMovieDetails(movieId)
			);
			this.setData({ selectedMovie: response.data.data });
		} catch (e) {
			this.setError(e.response.data?.errors);
		}
	}

	async searchMovie(query) {
		try {
			this.setLoading();
			const response = await authRequest(() =>
				MoviesService.searchMovie(query)
			);
			this.setData({ searchResults: response.data.data });
		} catch (e) {
			this.setError(e.response.data?.errors);
		}
	}

	clearSelectedMovie() {
		this.success = false;
		this.actionLoading = false;
		this.actionSuccess = false;
		this.actionData = null;
		this.actionErrors = null;
		this.errors = null;
		if (this.data?.selectedMovie) {
			this.data.selectedMovie = null;
		}
	}

	clearReviewFormData() {
		this.reviewFormData = {};
		this.actionLoading = false;
		this.actionSuccess = false;
		this.actionData = null;
		this.actionErrors = null;
	}

	updateReviewFormData(propertyName, value) {
		this.reviewFormData[propertyName] = value;
	}

	async addReview() {
		try {
			this.setActionLoading();
			const reviewData = {
				movieIMDBId: this.data.selectedMovie.IMDBId,
				rating: this.reviewFormData.rating,
				feedback: this.reviewFormData.feedback,
			};
			await authRequest(() => MoviesService.addReview(reviewData));
			const updatedMovieDetails = await authRequest(() =>
				MoviesService.getMovieDetails(this.data.selectedMovie.IMDBId)
			);
			this.setData({ selectedMovie: updatedMovieDetails.data.data });
			this.setActionData(null);
		} catch (e) {
			this.setActionError(e.response.data?.errors);
		}
	}

	async deleteReview(reviewId) {
		try {
			this.setActionLoading();
			await authRequest(() => MoviesService.deleteReview(reviewId));
			const updatedMovieDetails = await authRequest(() =>
				MoviesService.getMovieDetails(this.data.selectedMovie.IMDBId)
			);
			this.setData({ selectedMovie: updatedMovieDetails.data.data });
			this.setActionData(null);
		} catch (e) {
			this.setActionError(e.response.data?.errors);
		}
	}
}

export default MoviesStore;
