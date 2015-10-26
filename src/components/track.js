import React, { Component, PropTypes } from 'react';

export default class Track extends Component {
	static propTypes = {
		onDecodeClick: PropTypes.func.isRequired,
		id: PropTypes.string.isRequired,
		filename: PropTypes.string.isRequired,
		isDecoded: PropTypes.bool.isRequired,
		isDecoding: PropTypes.bool.isRequired
	}

	constructor(...args) {
		super(...args);
		this.playTrack = this.playTrack.bind(this);
		this.decodeTrack = this.decodeTrack.bind(this);
	}

	playTrack() {
		this.props.source.start(0);
	}

	decodeTrack() {
		this.props.onDecodeClick();
	}

	render() {
		let button;

		if (this.props.isDecoding)
			button = <button type="button" disabled={true}>Decoding...</button>;
		else if (!this.props.isDecoded)
			button = <button type="button" onClick={this.decodeTrack}>Decode</button>;
		else
			button = <button type="button" onClick={this.playTrack}>Play</button>;

		return (
			<div>
				<h1>{this.props.filename} <small>{this.props.id}</small></h1>
				{ button}
			</div>
		);
	}
}