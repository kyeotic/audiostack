import audioContext from './audio-context';
import {bufferToAudioBuffer} from './audio-buffer-encoder';

class ReusableAudioSourceNode {
	constructor (audioBuffer) {
		this.buffer = audioBuffer;
	}

	start(startTime = 0) {
		//Do not allow multiple sources to play at the same time
		if (this.source) return;
		this.source = _sourceFromAudioBuffer(this.buffer);
		this.source.start(startTime);
	}

	stop() {
		this.source.stop();
		this.source = null
	}
}


function _sourceFromAudioBuffer(audioBuffer) {
	var source = audioContext.createBufferSource();
	source.buffer = audioBuffer;
	source.connect(audioContext.destination);
	return source;
}

export function sourceFromAudioBuffer(audioBuffer) {
	return new ReusableAudioSourceNode(audioBuffer);
}

export function sourceFromBuffer(buffer) {
	return bufferToAudioBuffer(buffer)
		  .then(sourceFromAudioBuffer);
}