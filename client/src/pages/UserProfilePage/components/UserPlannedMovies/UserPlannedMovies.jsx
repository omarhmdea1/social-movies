import { useState, useEffect } from "react";
import { observer, inject } from "mobx-react";

import SortableList, {
	DraggableItem,
} from "../../../../components/SortableList";

import * as Styles from "./UserPlannedMoviesStyles";
import PlannedMovieCard from "../../../../components/PlannedMovieCard";
import Button from "../../../../components/Button";
import Loading from "../../../../components/Loading";

function UserPlannedMovies(props) {
	const { UsersStore } = props;
	const {
		actionLoading,
		actionErrors,
		actionSuccess,
		data,
		activeUserPlannedMovies,
		editableActiveUserPlannedMovies,
	} = UsersStore;
	const {
		firstName,
		isActiveUser,
		plannedMovies: userPlannedMovies,
	} = data.selectedUser;
	const [editMode, setEditMode] = useState(false);

	useEffect(() => {
		return () => {
			if (isActiveUser && activeUserPlannedMovies) {
				revertChanges();
			}
		};
	}, []);

	useEffect(() => {
		if (actionSuccess) {
			setEditMode(false);
		}
	}, [actionSuccess]);

	async function saveChanges() {
		await UsersStore.savePlannedMovies();
	}

	function revertChanges() {
		UsersStore.revertPlannedMoviesChanges();
		UsersStore.clearActionState();
		setEditMode(false);
	}

	let plannedMovies;
	if (isActiveUser) {
		plannedMovies = activeUserPlannedMovies;
	} else {
		plannedMovies = userPlannedMovies;
	}

	if (!plannedMovies || plannedMovies.length === 0) {
		return null;
	}

	function buildPlannedMoviesElements(plannedMovies) {
		return plannedMovies.map((plannedMovie) => {
			const movieElement = (
				<PlannedMovieCard
					key={plannedMovie.id}
					plannedMovie={plannedMovie}
					editMode={editMode}
					toggleVisibility={() =>
						UsersStore.locallyTogglePlannedMovieVisibility(
							plannedMovie.id
						)
					}
					deleteMovie={() =>
						UsersStore.locallyDeletePlannedMovie(plannedMovie.id)
					}
				/>
			);
			if (!editMode) {
				return movieElement;
			}

			return (
				<DraggableItem id={plannedMovie.id} key={plannedMovie.id}>
					<Styles.MovieDraggingState>
						{movieElement}
					</Styles.MovieDraggingState>
				</DraggableItem>
			);
		});
	}

	return (
		<Styles.Root>
			<Styles.Header>
				{isActiveUser && <h2 className="h5">You Planning to watch</h2>}
				{!isActiveUser && (
					<h2 className="h5">{firstName} is Planning to watch</h2>
				)}

				<Styles.HeaderRightSide>
					{actionLoading && isActiveUser && <Loading small />}

					<Styles.HeaderActions>
						{!actionLoading && isActiveUser && editMode && (
							<>
								<Button onClick={revertChanges} secondary>
									Cancel
								</Button>
								<Button onClick={saveChanges}>Save</Button>
							</>
						)}
						{!actionLoading && isActiveUser && !editMode && (
							<Button onClick={() => setEditMode(true)} secondary>
								Edit
							</Button>
						)}
					</Styles.HeaderActions>
				</Styles.HeaderRightSide>
			</Styles.Header>

			{editMode && (
				<SortableList
					items={editableActiveUserPlannedMovies}
					pressDelay={400}
					setItems={(items) =>
						UsersStore.locallyReOrderPlannedMovies(items)
					}
				>
					<Styles.MoviesList>
						{buildPlannedMoviesElements(
							editableActiveUserPlannedMovies
						)}
					</Styles.MoviesList>
				</SortableList>
			)}

			{!editMode && (
				<Styles.MoviesList>
					{buildPlannedMoviesElements(plannedMovies)}
				</Styles.MoviesList>
			)}
		</Styles.Root>
	);
}

export default inject("UsersStore")(observer(UserPlannedMovies));
