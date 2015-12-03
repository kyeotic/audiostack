import { 
	SHOW_TRACK_SLICE, HIDE_TRACK_SLICE,
	CREATE_SLICE_START, CREATE_SLICE_SUCCESS
} from 'actions/index';

export default function slices(state = { }, action) {
	switch (action.type) {
	case SHOW_TRACK_SLICE: 
		return state;
	case HIDE_TRACK_SLICE:
		return state;
	case CREATE_SLICE_START:
		return Object.assign({}, state, {
			[action.payload.id]: Object.assign({}, action.payload, {
				isReady: false
			})
		});
	case CREATE_SLICE_SUCCESS:
		return Object.assign({}, state, {
			[action.payload.id]: Object.assign({}, action.payload, {
				isReady: true
			})
		});
	default:
		return state;
	}
}