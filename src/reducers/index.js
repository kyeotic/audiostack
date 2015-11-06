import { combineReducers } from 'redux';
import {
	READ_SONG_FILE, READ_SONG_FILE_SUCCESS,
	READ_SONG_STORE, READ_SONG_STORE_SUCCESS,
	DECODE_TRACK, DECODE_TRACK_SUCCESS, PLAY_TRACK, STOP_TRACK
} from 'actions/index';

function tracksById(state = { }, action) {
	switch (action.type) {
	case READ_SONG_FILE:
		return Object.assign({}, state, {
			[action.track.id]: Object.assign({}, action.track)
		});
	case READ_SONG_FILE_SUCCESS:
		return Object.assign({}, state, {
			[action.trackId]: Object.assign({}, state[action.track.id], action.track)
		});
	default:
		return state;
	}
}

const rootReducer = combineReducers({
	tracksById
});

export default rootReducer;