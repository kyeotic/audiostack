import audioContext from 'audio/audio-context';
//import AudioBufferSlice from 'audiobuffer-slice';

//This was pulled in to fix a bug, a PR has bee created in the original library

function AudioBufferSlice(buffer, begin, end, callback) {
    if (!(this instanceof AudioBufferSlice)) {
      return new AudioBufferSlice(buffer, begin, end, callback);
    }

    var error = null;

    var duration = buffer.duration;
    var channels = buffer.numberOfChannels;
    var rate = buffer.sampleRate;

    if (typeof end === 'function') {
      callback = end;
      end = duration;
    }

    // milliseconds to seconds
    begin = begin/1000;
    end = end/1000;

    if (begin < 0) {
      error = new RangeError('begin time must be greater than 0');
    }

    if (end > duration) {
      error = new RangeError('end time must be less than or equal to ' + duration);
    }

    if (typeof callback !== 'function') {
      error = new TypeError('callback must be a function');
    }

    var startOffset = rate * begin;
    var endOffset = rate * end;
    var frameCount = endOffset - startOffset;
    var newArrayBuffer;

    try {

      newArrayBuffer = audioContext.createBuffer(channels, endOffset, rate);
      var anotherArray = new Float32Array(frameCount);
      var offset = 0;

      for (var channel = 0; channel < channels; channel++) {
        buffer.copyFromChannel(anotherArray, channel, startOffset);
        newArrayBuffer.copyToChannel(anotherArray, channel, offset);
      }
    } catch(e) {
      error = e;
    }

    callback(error, newArrayBuffer);
  }

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