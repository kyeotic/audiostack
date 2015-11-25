import audioContext from './audio-context';
import {bufferToAudioBuffer} from './audio-buffer-encoder';

export class ReusableAudioSourceNode {
	constructor (audioBuffer) {
		this.buffer = audioBuffer;
		this.source = audioBuffer ? createAudioBufferSourceNode(this.buffer)
								  : getAudioSource();
		this.isPlaying = false;
	}

	start(startTime = 0) {
		//Don't allow more than one play to run at a time
		if (this.isPlaying) return;
		if (!this.source.buffer && !this.buffer)
			throw new Error('Cannot play AudioSource, buffer has not yet been set.');
		if (!this.source.buffer)
			this.source = createAudioBufferSourceNode(this.buffer);

		this.source.start(startTime);
		this.isPlaying = true;
		setTimeout(() => {
			console.log('play finished');
			this.isPlaying = false;
		}, this.buffer.duration * 1000);
	}

	stop() {
		this.isPlaying = false;
		this.source.stop();
		this.source = createAudioBufferSourceNode(this.buffer);
	}
}

function getAudioSource() {
	var source = audioContext.createBufferSource();
	source.connect(audioContext.destination);
	return source;
}

function createAudioBufferSourceNode(audioBuffer) {
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