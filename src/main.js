import React, {Component} from 'react';
import ReactDom from 'react-dom';

class HelloWorld extends Component {
	render () {
		return <p>hello world</p>;
	}
}

ReactDom.render(<HelloWorld />, document.getElementById('app-host'));