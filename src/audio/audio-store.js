import { sourceFromBuffer } from 'audio/audio-source';
import localforage from 'localforage';

const trackStore = localforage.createInstance({name: 'tracks'});
const trackBufferStore = localforage.createInstance({name: 'buffers'});

export function saveTrack(track) {
	let trackToSave = Object.assign({}, track);
	delete trackToSave.source;
	return trackStore.setItem(track.id, trackToSave)
		.then(() => track);
}

export function loadTrack(trackId) {
	return trackStore.getItem(trackId);
}

export function saveTrackBuffer(trackId, buffer) {
	return trackBufferStore.setItem(trackId, {buffer})
		.then(() => buffer);
}

export function loadTrackBuffer(trackId) {
	return trackBufferStore.getItem(trackId)
		.then(r => r.buffer);
}

export function removeTrack(trackId) {
	return Promise.all([
		trackStore.removeItem(trackId),
		trackBufferStore.removeItem(trackId)
	]);
}

export function getTrackIds() {
	return trackStore.keys();
}

export function loadAllTracks() {
	return getTrackIds()
		.then(keys => Promise.all(keys.map(loadTrack)))
		.then(tracks => Promise.all(tracks.map(track => {
			if (track.isLoaded)
				return new Promise((resolve) => {
					loadTrackBuffer(track.id)
						.then(sourceFromBuffer)
						.then(source => {
							track.source = source;
							resolve(track);
						});
				});
			return Promise.resolve(track);
		})))
}