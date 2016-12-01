var express = require('express');
var app = express();

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.get('/', function (req, res) {
    res.sendFile('index.html', {
        root: './view'
    });
});


app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);