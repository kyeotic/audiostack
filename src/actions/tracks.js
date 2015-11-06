import { sourceFromBuffer } from 'audio/audio-source';
import readTags from 'audio/tag-reader';

export const REMOVE_TRACK = 'REMOVE_TRACK';
export const PLAY_TRACK = 'PLAY_TRACK';
export const STOP_TRACK = 'STOP_TRACK';

export function playTrack(trackId) {
	return { type: PLAY_TRACK, trackId };
}

export function stopTrack(trackId) {
	return { type: STOP_TRACK, trackId };
}