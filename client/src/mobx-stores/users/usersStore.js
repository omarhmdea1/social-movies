import { makeObservable, action, observable } from "mobx";

import BaseStore from "../baseStore";
import UsersService from "../../services/usersService";
import authRequest from "../../utils/authRequest";

class UsersStore extends BaseStore {
	activeUserFollowingList = null;
	activeUserFollowersList = null;
	activeUserPlannedMovies = null;
	editableActiveUserPlannedMovies = null;
	plannedMovieFormData = {
		visibleToOthers: true,
	};

	constructor(props) {
		super(props);

		makeObservable(this, {
			activeUserFollowingList: observable,
			activeUserFollowersList: observable,
			activeUserPlannedMovies: observable,
			editableActiveUserPlannedMovies: observable,
			plannedMovieFormData: observable,
			getFeed: action,
			searchUser: action,
			getUserProfile: action,
			getActiveUserDynamicData: action,
			followUser: action,
			unFollowUser: action,
			clearActionState: action,
			clearSelectedUser: action,
			addPlannedMovie: action,
			deletePlannedMovie: action,
			updatePlannedMovieFormData: action,
			clearPlannedMovieFormData: action,
			locallyReOrderPlannedMovies: action,
			locallyTogglePlannedMovieVisibility: action,
			locallyDeletePlannedMovie: action,
			revertPlannedMoviesChanges: action,
			savePlannedMovies: action,
		});
	}

	async getFeed() {
		try {
			this.setLoading();
			const response = await authRequest(() => UsersService.getFeed());
			this.setData({ feed: response.data.data });
		} catch (e) {
			this.setError(e.response.data?.errors);
		}
	}

	async searchUser(query) {
		try {
			this.setLoading();
			const response = await authRequest(() =>
				UsersService.searchUser(query)
			);
			this.setData({ searchResults: response.data.data });
		} catch (e) {
			this.setError(e.response.data?.errors);
		}
	}

	async getUserProfile(userId) {
		try {
			this.setLoading();
			const response = await authRequest(() =>
				UsersService.getUserProfile(userId)
			);
			this.setData({ selectedUser: response.data.data });
		} catch (e) {
			this.setError(e.response.data?.errors);
		}
	}

	clearSelectedUser() {
		this.success = false;
		this.errors = null;
		if (this.data?.selectedUser) {
			this.data.selectedUser = null;
		}
	}

	async getActiveUserDynamicData() {
		try {
			const response = await authRequest(() =>
				UsersService.getActiveUserDynamicData()
			);
			this.activeUserFollowingList = response.data.data.followingList;
			this.activeUserFollowersList = response.data.data.followersList;
			this.activeUserPlannedMovies = response.data.data.plannedMovies;
			this.editableActiveUserPlannedMovies =
				response.data.data.plannedMovies;
		} catch (e) {
			this.setActionError(e.response.data?.errors);
		}
	}

	async followUser(userToFollow) {
		try {
			this.setActionLoading();
			await authRequest(() => UsersService.followUser(userToFollow));
			await this.getActiveUserDynamicData();

			if (this.data?.selectedUser) {
				const response = await authRequest(() =>
					UsersService.getUserProfile(this.data.selectedUser.id)
				);
				this.setData({ selectedUser: response.data.data });
			}
			this.setActionData();
		} catch (e) {
			this.setActionError(e.response.data?.errors);
		}
	}

	async unFollowUser(userToUnFollow) {
		try {
			this.setActionLoading();
			await authRequest(() => UsersService.unFollowUser(userToUnFollow));
			await this.getActiveUserDynamicData();
			if (this.data?.selectedUser) {
				const response = await authRequest(() =>
					UsersService.getUserProfile(this.data.selectedUser.id)
				);
				this.setData({ selectedUser: response.data.data });
			}
			this.setActionData();
		} catch (e) {
			this.setActionError(e.response.data?.errors);
		}
	}

	clearActionState() {
		this.setActionData();
	}

	async addPlannedMovie(movieIMDBId) {
		try {
			const plannedMovie = {
				movieIMDBId,
				visibleToOthers: this.plannedMovieFormData.visibleToOthers,
			};
			this.setActionLoading();
			await authRequest(() => UsersService.addPlannedMovie(plannedMovie));
			await this.getActiveUserDynamicData();
			this.setActionData();
		} catch (e) {
			this.setActionError(e.response.data?.errors);
		}
	}

	async deletePlannedMovie(plannedMovieId) {
		try {
			this.setActionLoading();
			await authRequest(() =>
				UsersService.deletePlannedMovie(plannedMovieId)
			);
			await this.getActiveUserDynamicData();
			this.setActionData();
		} catch (e) {
			this.setActionError(e.response.data?.errors);
		}
	}

	updatePlannedMovieFormData(propertyName, value) {
		this.plannedMovieFormData[propertyName] = value;
	}

	clearPlannedMovieFormData() {
		this.plannedMovieFormData = {
			visibleToOthers: true,
		};
		this.actionLoading = false;
		this.actionSuccess = false;
		this.actionData = null;
		this.actionErrors = null;
	}

	locallyReOrderPlannedMovies(plannedMovies) {
		this.editableActiveUserPlannedMovies = plannedMovies;
	}

	locallyTogglePlannedMovieVisibility(plannedMovieId) {
		let plannedMovieIndex = this.editableActiveUserPlannedMovies.findIndex(
			(plannedMovie) => plannedMovie.id === plannedMovieId
		);
		const plannedMovie =
			this.editableActiveUserPlannedMovies[plannedMovieIndex];
		this.editableActiveUserPlannedMovies[plannedMovieIndex] = {
			...plannedMovie,
			visibleToOthers: !plannedMovie.visibleToOthers,
		};
	}

	locallyDeletePlannedMovie(plannedMovieId) {
		this.editableActiveUserPlannedMovies =
			this.editableActiveUserPlannedMovies.filter(
				(plannedMovie) => plannedMovie.id !== plannedMovieId
			);
	}

	revertPlannedMoviesChanges() {
		this.editableActiveUserPlannedMovies = [
			...this.activeUserPlannedMovies,
		];
	}

	async savePlannedMovies() {
		try {
			this.setActionLoading();
			const response = await authRequest(() =>
				UsersService.updatePlannedMovies(
					this.editableActiveUserPlannedMovies
				)
			);
			const updatedPlannedMovies = response.data.data;
			this.activeUserPlannedMovies = updatedPlannedMovies;
			this.editableActiveUserPlannedMovies = [...updatedPlannedMovies];
			this.setActionData();
		} catch (e) {
			this.setActionError(e.response.data?.errors);
		}
	}
}

export default UsersStore;
