import { combineReducers } from 'redux';
import {
	READ_SONG_FILE, READ_SONG_FILE_SUCCESS,
	REMOVE_TRACK_START, REMOVE_TRACK_SUCCESS //,
	//DECODE_TRACK, DECODE_TRACK_SUCCESS, PLAY_TRACK, STOP_TRACK
} from 'actions/index';

function tracksById(state = { }, action) {
	switch (action.type) {
	case READ_SONG_FILE:
		return Object.assign({}, state, {
			[action.payload.id]: Object.assign({}, action.payload)
		});
	case READ_SONG_FILE_SUCCESS:
		return Object.assign({}, state, {
			[action.payload.id]: Object.assign({}, state[action.payload.id], action.payload)
		});
	case REMOVE_TRACK_START:
		return state;
	case REMOVE_TRACK_SUCCESS:
		let newState = Object.assign({}, state);
		delete newState[action.payload.id];
		return newState;
	default:
		return state;
	}
}

const rootReducer = combineReducers({
	tracksById
});

export default rootReducer;