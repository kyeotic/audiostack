import audioContext from './audio-context';

export function bufferToBase64 (buffer) {
    let bytes = new Uint8Array(buffer);
    let len = buffer.byteLength;
    let binary = '';
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

export function base64ToBuffer (buffer) {
    let binary = window.atob(buffer);
    let buffer = new ArrayBuffer(binary.length);
    let bytes = new Uint8Array(buffer);
    for (let i = 0; i < buffer.byteLength; i++) {
        bytes[i] = binary.charCodeAt(i) & 0xFF;
    }
    return buffer;
};

export function bufferToAudioBuffer (buffer) {
	return new Promise((resolve) => {
		audioContext.decodeAudioData(buffer, resolve);		
	});
}