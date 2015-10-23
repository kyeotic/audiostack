import audioContext from './audio-context';
import {bufferToAudioBuffer} from './audio-buffer-encoder';

export function sourceFromAudioBuffer(audioBuffer) {
	var source = audioContext.createBufferSource();
	source.buffer = audioBuffer;
	source.connect(audioContext.destination);
	return source;
}

export function sourceFromBuffer(buffer) {
	return bufferToAudioBuffer(buffer).then(sourceFromAudioBuffer);
}