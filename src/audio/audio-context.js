const audioContext = new (window.AudioContext || window.webkitAudioContext)();;

export default audioContext;

export function getAudioSource() {
	var source = audioContext.createBufferSource();
	source.connect(audioContext.destination);
	return source;
}