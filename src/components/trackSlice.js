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
	}

	createSlice = () => {
		this.props.onCreate(this.sliceSource);
	}

	preview = () => {
		this.sliceSource = getAudioSource();
		let values = this.state.values;
		sliceAudioBuffer(this.props.source.buffer, values[0] * 1000, values[1] * 1000)
			.then(buffer => this.sliceSource.buffer = buffer)
			.then(() => this.sliceSource.start(0))
			.catch(error => console.log(error));
	}

	stopPreview = () => {
		this.sliceSource.stop();
	}

	onChange = (values) => {
		//console.log('updating values', values);
		this.setState({values: values});
	}

	render() {
		return (			
			<div>
				<button type="button" className="btn" onClick={this.preview}>{'Preview'}</button>
				<button type="button" className="btn" onClick={this.stopPreview}>{'Stop'}</button>
				<button type="button" className="btn" onClick={this.createSlice}>{'Slice'}</button>
				<p>{`Start: ${this.state.values[0]} Stop: ${this.state.values[1]}`}</p>
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
			</div>
		);
	}
}