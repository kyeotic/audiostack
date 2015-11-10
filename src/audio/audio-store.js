import { sourceFromBuffer } from 'audio/audio-source';
import localforage from 'localforage';

export function saveTrack(track) {
	return localforage.setItem(track.id, track);
}

export function loadTrack(trackId) {
	return localforage.getItem(trackId)
			.then(track => sourceFromBuffer(track.buffer)
							.then(source => {
								track.source = source;
								return track;
							}));
}

export function removeTrack(trackId) {
	return localforage.removeItem(trackId);
}

export function getTrackIds() {
	return localforage.keys();
}

export function loadAllTracks() {
	return getTrackIds()
		.then(keys => Promise.all(keys.map(loadTrack)));
}