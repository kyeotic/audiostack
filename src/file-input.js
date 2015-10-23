import React, {Component, PropTypes} from 'react';
import ReactDom from 'react-dom';

export default class FileInput extends Component {
	static propTypes = {
		onChange: PropTypes.func.isRequired
	}
	render () {
		 return <input type="file" 
		 				onChange={(e) =>this.props.onChange(e.target.files[0])} />
	}
}