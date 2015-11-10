export function bufferFromFile(file) {
	return new Promise((resolve) => {
		var reader = new FileReader();
		reader.onload = (e) => {
			resolve(e.target.result);
		};
		reader.readAsArrayBuffer(file);
	});
}