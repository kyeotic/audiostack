import { Component, PropTypes } from 'react';

class Editor extends Component {
	static propTypes = {
		onDecodeClick: PropTypes.func.isRequired,
		tracks: PropTypes.arrayOf(PropTypes.shape({
			filename: PropTypes.string.isRequired,
			isDecoded: PropTypes.bool.isRequired,
			isDecoding: PropTypes.bool.isRequired
		}).isRequired).isRequired
	}
	
	render() {

	}
}