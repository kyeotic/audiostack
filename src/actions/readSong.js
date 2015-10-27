import shortId from 'shortid';
import { bufferFromFile } from 'audio/audio-file-decoder';

export const READ_SONG_FILE  = 'READ_SONG_FILE';
export const READ_SONG_FILE_SUCCESS = 'READ_SONG_FILE_SUCCESS';

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