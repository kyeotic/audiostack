import { sourceFromBuffer } from 'audio/audio-source';

export const REMOVE_TRACK = 'REMOVE_TRACK';
export const DECODE_TRACK = 'DECODE_TRACK';
export const DECODE_TRACK_SUCCESS = 'DECODE_TRACK_SUCCESS';
export const PLAY_TRACK = 'PLAY_TRACK';
export const STOP_TRACK = 'STOP_TRACK';

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