import shortId from 'shortid';
import { bufferFromFile } from 'audio/audio-file-decoder';
import { sourceFromBuffer } from 'audio/audio-source';
import * as store from 'audio/audio-store';
import readTags from 'audio/tag-reader';
import actionCreator from './actionCreator';

export const READ_SONG_FILE  = 'READ_SONG_FILE';
export const READ_SONG_FILE_SUCCESS = 'READ_SONG_FILE_SUCCESS';
export const REMOVE_TRACK_START = 'REMOVE_TRACK_START';
export const REMOVE_TRACK_SUCCESS = 'REMOVE_TRACK_SUCCESS';
export const PLAY_TRACK = 'PLAY_TRACK';
export const STOP_TRACK = 'STOP_TRACK';

//Read
//
let readSongFile = actionCreator(READ_SONG_FILE);
let readSongSuccess = actionCreator(READ_SONG_FILE_SUCCESS);

export function loadSongFile (file) {
	let track = {
		id: shortId.generate(),
		filename: file.name,
		artist: null,
		album: null,
		title: null,
		source: null,
		buffer: null
	};
	return dispatch => {
		dispatch(readSongFile(Object.assign({}, track)));
		return bufferFromFile(file)
			.then(buffer => Object.assign(track, { buffer: buffer}))
			.then(track => readTags(file)
							.then(tags => Object.assign(track, tags)))
			.then(track => store.saveTrack(track))
			.then(track => sourceFromBuffer(track.buffer)
							.then(source => Object.assign(track, { source: source})))
			.then(track => dispatch(readSongSuccess(track)));
	};
};

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