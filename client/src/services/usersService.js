import axios from "axios";

class UsersService {
	static getFeed() {
		return axios.get("/api/users/feed");
	}
	static searchUser(query) {
		return axios.get(`/api/users/search?query=${query}`);
	}
	static getUserProfile(id) {
		return axios.get(`/api/users/user/${id}`);
	}
	static getActiveUserDynamicData() {
		return axios.get(`/api/users/getActiveUserDynamicData`);
	}
	static followUser(id) {
		return axios.post(`/api/users/following/${id}`);
	}
	static unFollowUser(id) {
		return axios.delete(`/api/users/following/${id}`);
	}
	static addPlannedMovie(plannedMovie) {
		return axios.post(`/api/users/planned-movies`, plannedMovie);
	}
	static deletePlannedMovie(plannedMovieId) {
		return axios.delete(`/api/users/planned-movies/${plannedMovieId}`);
	}
	static updatePlannedMovies(plannedMovies) {
		return axios.put(`/api/users/planned-movies`, { plannedMovies });
	}
}

export default UsersService;
