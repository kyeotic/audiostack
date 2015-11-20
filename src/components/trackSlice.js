import React, { Component, PropTypes } from 'react';
import ReactSlider from 'ReactSlider';

export default class TrackSlice extends Component {
	static propTypes = {
		onCreate: PropTypes.func.isRequired
	}

	constructor(...args) {
		super(...args);
		this.createSlice = this.createSlice.bind(this);
		this.preview = this.preview.bind(this);
		this.stopPreview = this.stopPreview.bind(this);
	}

	createSlice() {
		this.props.onCreate();
	}

	preview() {

	}

	stopPreview() {

	}

	render() {
		return (
			<ReactSlider />
		);
	}
}