import React from 'react';
import ReactDom from 'react-dom';

var HelloWorld = React.createClass({
	render: function() {
		return <p>hello world</p>;
	}
});

ReactDom.render(<HelloWorld />, document.getElementById('app-host'));