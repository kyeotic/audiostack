import shortId from 'shortid';
import { bufferFromFile } from 'audio/audio-file-decoder';
import { sourceFromBuffer } from 'audio/audio-source';
import { saveTrack } from 'audio/audio-store';
import readTags from 'audio/tag-reader';

export const READ_SONG_FILE  = 'READ_SONG_FILE';
export const READ_SONG_FILE_SUCCESS = 'READ_SONG_FILE_SUCCESS';
export const READ_SONG_STORE = 'READ_SONG_STORE';
export const READ_SONG_STORE_SUCCESS = 'READ_SONG_STORE_SUCCESS';

function readSongFile (track) {
	return { type: READ_SONG_FILE, track };
};
function readSongSuccess (track) {
	return { type: READ_SONG_FILE_SUCCESS, track };
};
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
			.then(track => saveTrack(track))
			.then(track => sourceFromBuffer(track.buffer)
							.then(source => Object.assign(track, { source: source})))
			.then(track => dispatch(readSongSuccess(track)));
	};
};