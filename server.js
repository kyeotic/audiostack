var fs = require('fs'),
    port = process.env.PORT || 9000,
    clientDir = __dirname + '/src/',
    jspmConfigName = '/jspm.config.js',
    jspmConfig = __dirname + jspmConfigName,
    jspmDir = __dirname + "/jspm_packages/",
    express = require('express'),
    app = express();

//Configure
app.use('/jspm_packages', express.static(jspmDir));
app.use(express.static(clientDir));

app.get(jspmConfigName, function(req, res) {
	res.sendFile(jspmConfig);
});

//Api
//require('./server_dist/routes')(app);

//Index Route
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

//Start Listening
app.listen(port);
console.log("Express server listening on port %d in %s mode", port, app.settings.env);
