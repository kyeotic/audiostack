import audioContext from './audio-context';

export function bufferFromFile(file) {
	return new Promise((resolve, reject) => {
		var reader = new FileReader();
		reader.onload = (e) => {
			resolve(e.target.result);
		};
		reader.readAsArrayBuffer(file);
	});
}