import shortId from 'shortid';
import { bufferFromFile } from 'audio/audio-file-decoder';
import { sourceFromBuffer } from 'audio/audio-source';
import * as store from 'audio/audio-store';
import readTags from 'audio/tag-reader';
import actionCreator from './actionCreator';

export const READ_SONG_FILE  = 'READ_SONG_FILE';
export const READ_SONG_FILE_SUCCESS = 'READ_SONG_FILE_SUCCESS';

export const LOAD_TRACK_SOURCE_START = 'LOAD_TRACK_SOURCE_START';
export const LOAD_TRACK_SOURCE_SUCCESS = 'LOAD_TRACK_SOURCE_SUCCESS';

export const UNLOAD_TRACK_SOURCE_START = 'UNLOAD_TRACK_SOURCE_START';
export const UNLOAD_TRACK_SOURCE_SUCCESS = 'UNLOAD_TRACK_SOURCE_SUCCESS';

export const REMOVE_TRACK_START = 'REMOVE_TRACK_START';
export const REMOVE_TRACK_SUCCESS = 'REMOVE_TRACK_SUCCESS';
export const PLAY_TRACK = 'PLAY_TRACK';
export const STOP_TRACK = 'STOP_TRACK';

//Read
//
let readSongFile = actionCreator(READ_SONG_FILE);
let readSongSuccess = actionCreator(READ_SONG_FILE_SUCCESS);

export function loadSongFile(file) {
	//Don't directly return this object, use Object.assign
	//So that it can safely be modified by this function
	let track = {
		id: shortId.generate(),
		filename: file.name,
		isLoaded: false,
		artist: null,
		album: null,
		title: null,
		source: null
	};
	return dispatch => {
		dispatch(readSongFile(Object.assign({}, track)));
		return readTags(file)
			.then(tags => Object.assign(track, tags))
			.then(track => bufferFromFile(file)
							.then(buffer => store.saveTrackBuffer(track.id, buffer))
							.then(sourceFromBuffer)
							.then(source => Object.assign(track, { source, isLoaded: true })))
			.then(store.saveTrack)			
			.then(track => dispatch(readSongSuccess(track)));
	};
};

//Load
//
let loadTrack = actionCreator(LOAD_TRACK_SOURCE_START);
let loadTrackSuccess = actionCreator(LOAD_TRACK_SOURCE_SUCCESS, 
									(id, source) => ({id, source}));

export function loadTrackSource(trackId) {
	return dispatch => {
		dispatch(loadTrack(trackId));
		return store.loadTrackBuffer(trackId)
			.then(sourceFromBuffer)
			.then(source => dispatch(loadTrackSuccess(trackId, source)));
	}
}

let unloadTrack = actionCreator(UNLOAD_TRACK_SOURCE_START);
let unloadTackSuccess = actionCreator(UNLOAD_TRACK_SOURCE_SUCCESS);

export function unloadTrackSource(trackId) {
	return (dispatch, getState) => {
		dispatch(unloadTrack(trackId));
		let unloadedTrack = Object.assign({}, getState().tracksById[trackId]);
		unloadedTrack.isLoaded = false;
		return store.saveTrack(unloadedTrack)
			.then(() => dispatch(unloadTackSuccess(trackId)));
	}
}

//Remove
//
let removeTrackStart = actionCreator(REMOVE_TRACK_START);
let removeTrackSuccess = actionCreator(REMOVE_TRACK_SUCCESS);
export function removeTrack(track) {
	return dispatch => {
		dispatch(removeTrackStart(Object.assign({}, track)));
		return store.removeTrack(track.id)
			.then(() => dispatch(removeTrackSuccess(Object.assign({}, track))));
	}
}


export function playTrack(trackId) {
	return { type: PLAY_TRACK, trackId };
}

export function stopTrack(trackId) {
	return { type: STOP_TRACK, trackId };
}