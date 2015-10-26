import shortId from 'shortid';
import { sourceFromBuffer } from 'audio/audio-source';
import { bufferFromFile } from 'audio/audio-file-decoder';

export const READ_SONG_FILE  = 'READ_SONG_FILE';
export const READ_SONG_FILE_SUCCESS = 'READ_SONG_FILE_SUCCESS';
export const REMOVE_TRACK = 'REMOVE_TRACK';
export const DECODE_TRACK = 'DECODE_TRACK';
export const DECODE_TRACK_SUCCESS = 'DECODE_TRACK_SUCCESS';
export const PLAY_TRACK = 'PLAY_TRACK';
export const STOP_TRACK = 'STOP_TRACK';
export const CREATE_AUDIO_SLICE = 'CREATE_AUDIO_SLICE';
export const REMOVE_AUDIO_SLICE = 'REMOVE_AUDIO_SLICE';
export const MOVE_AUDIO_SLICE = 'MOVE_AUDIO_SLICE';
export const PLAY_AUDIO_DECK = 'PLAY_AUDIO_DECK';
export const STOP_AUDIO_DECK = 'STOP_AUDIO_DECK';
export const PAUSE_AUDIO_DECK = 'PAUSE_AUDIO_DECK';
export const PLAY_AUDIO_SLICE = 'PLAY_AUDIO_SLICE';
export const STOP_AUDIO_SLICE = 'STOP_AUDIO_SLICE';


//Song File
//
function readSongFile (track) {
	return { type: READ_SONG_FILE, track };
};
function readSongSuccess (trackId, buffer) {
	return { type: READ_SONG_FILE_SUCCESS, trackId, buffer };
};
export function loadSongFile (file) {
	const track = {
		id: shortId.generate(),
		filename: file.name,
		isDecoded: false,
		isDecoding: false,
		source: null,
		buffer: null
	};
	return dispatch => {
		console.log('loading', file)
		dispatch(readSongFile(track));
		return bufferFromFile(file)
			.then(buffer =>
				dispatch(readSongSuccess(track.id, buffer)));
	}
};

//Tracks
//
function decodeTrackStart(trackId) {
	return { type: DECODE_TRACK, trackId };
};
function decodeTrackSuccess(trackId, source) {
	return { type: DECODE_TRACK_SUCCESS, trackId, source };
};

export function decodeTrack(trackId) {
	return (dispatch, getState) => {
		dispatch(decodeTrackStart(trackId));
		const track = getState().tracksById[trackId];
		return sourceFromBuffer(track.buffer)
			.then(source => dispatch(decodeTrackSuccess(track.id, source)));
	}
};

export function playTrack(trackId) {
	return { type: PLAY_TRACK, trackId };
}

export function stopTrack(trackId) {
	return { type: STOP_TRACK, trackId };
}