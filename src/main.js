import React, {Component} from 'react';
import ReactDom from 'react-dom';
import FileInput from './file-input';
import {bufferFromFile} from './audio/audio-file-decoder';
import {sourceFromBuffer, sourceFromAudioBuffer} from './audio/audio-source';
import {bufferToBase64, base64ToBuffer, bufferToAudioBuffer} from './audio/audio-buffer-encoder';
import localforage from 'localforage';

class HelloWorld extends Component {
	handleFileChange(file) {
		bufferFromFile(file)
		.then(buffer => {
			return localforage.setItem('file', bufferToBase64(buffer))
				.then(() => {
					return buffer;
				});
			//console.log(bufferToBase64(buffer));
			//return buffer;
		})
		.then(sourceFromBuffer).then(source => {
			source.start(0);
		})
		.catch(console.log.bind(console));
	}

	handleOnClick() {
		localforage.getItem('file').then(bufferString => {
			bufferToAudioBuffer(base64ToBuffer(bufferString))
				//.then(console.log.bind(console))
				.then(sourceFromAudioBuffer)
				.then(source => {
					source.start(0);
				});
		})
		.catch(console.log.bind(console));
	}

	render () {
		return (
			<div>
				<FileInput onChange={(file) => this.handleFileChange(file)} />
				<button type="button" onClick={() => this.handleOnClick()}>
					Load File
				</button>
			</div>
		);
	}
}

ReactDom.render(<HelloWorld />, document.getElementById('app-host'));