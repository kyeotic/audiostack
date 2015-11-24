import React, { Component, PropTypes } from 'react';
import ReactSlider from 'react-slider';
import { getAudioSource } from 'audio/audio-context';
import { sliceAudioBuffer } from 'audio/audio-slicer';

export default class TrackSlice extends Component {
	static propTypes = {
		onCreate: PropTypes.func.isRequired,
		source: PropTypes.shape({
			buffer: PropTypes.shape({
				duration: PropTypes.number
			})
		}) 
	}

	constructor(...args) {
		super(...args);
		this.minValue = 0;
		this.maxValue = Math.floor(this.props.source.buffer.duration);
		this.state = {values: [this.minValue, this.maxValue]};
		this.sliceSource = getAudioSource();
	}

	createSlice = () => {
		this.props.onCreate();
	}

	preview = () => {
		let values = this.values;
		sliceAudioBuffer(this.source.buffer, values[0], values[1])
			.then(buffer => this.sliceSource.buffer = buffer)
			.then(() => this.sliceSource.play())
			.catch(error => console.log(error));
	}

	stopPreview = () => {
		this.sliceSource.stop();
	}

	onChange = (values) => {
		console.log('updating values', values);
		this.setState({values: values});
	}

	render() {
		return (
			<div className="slider-container">
				<ReactSlider 
					value={this.state.values}
					max={this.maxValue}
					min={this.minValue}
					onChange={this.onChange}
					pearling
					withBars 
				/>
			</div>
		);
	}
}