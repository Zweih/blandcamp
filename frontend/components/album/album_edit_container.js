import { connect } from "react-redux";
import AlbumEdit from "./album_edit";
import { 
	clearAlbumErrors,
	fetchAlbum,
	updateAlbum } from "../../actions/album_actions";

import { selectAlbum, selectAlbumTracks } from "../../reducers/selectors";

const mapStateToProps = (state, ownProps) => {
	const currentUser = state.entities.users[state.session.id];
	const albumUserId = parseInt(ownProps.match.params.userId);
	const albumId = parseInt(ownProps.match.params.albumId);
	const album = selectAlbum(state.entities, albumId);
	const errors = state.errors.album;
	const formType = "Edit Album";
	const formClass = "a-edit";
	
	const albumTrackIds = album.track_ids.sort((a, b) => {
		return a - b;
	});

	const albumTracks = selectAlbumTracks(state.entities, albumTrackIds);

	return {
		errors,
		formType,
		formClass,
		currentUser,
		album,
		albumId,
		albumUserId,
		albumTracks,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		processForm: (formData) => dispatch(updateAlbum(formData)),
		fetchAlbum: (albumId) => dispatch(fetchAlbum(albumId)),
		clearAlbumErrors: () => dispatch(clearAlbumErrors()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AlbumEdit);