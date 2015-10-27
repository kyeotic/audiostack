import shortId from 'shortid';
import { bufferFromFile } from 'audio/audio-file-decoder';
import { saveTrack, loadTrackBuffer} from 'audio/audio-store';

export const READ_SONG_FILE  = 'READ_SONG_FILE';
export const READ_SONG_FILE_SUCCESS = 'READ_SONG_FILE_SUCCESS';
export const READ_SONG_STORE = 'READ_SONG_STORE';
export const READ_SONG_STORE_SUCCESS = 'READ_SONG_STORE_SUCCESS';

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
		dispatch(readSongFile(track));
		return bufferFromFile(file)
			.then(buffer => saveTrack(Object.assign({}, track, { buffer: buffer}))
							.then(() => buffer))
			.then(buffer => dispatch(readSongSuccess(track.id, buffer)));
	};
};

function readSongStore (track) {
	return { type: READ_SONG_STORE, track };
}
function readSongStoreSuccess (track) {
	return { type: READ_SONG_STORE_SUCCESS, track};
};

export function loadSongStore (trackId) {
	const track = {
		id: trackId,
		filename: 'Loading from store',
		isDecoded: false,
		isDecoding: false,
		source: null,
		buffer: null
	};
	return dispatch => {
		dispatch(readSongStore(track));
		return loadTrackBuffer(trackId)
			.then(track => dispatch(readSongStoreSuccess(track)));
	};
}