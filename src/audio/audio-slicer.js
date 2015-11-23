import AudioBufferSlice from 'audiobuffer-slice';

export function sliceAudioBuffer(audioBuffer, start, finish) {
	return new Promise((resolve, reject) => {
		AudioBufferSlice(audioBuffer, start, finish, function(error, slicedAudioBuffer) {
			if (error) {
				reject(error);
			} else {
				resolve(slicedAudioBuffer);
			}
		});
	});
}