define(['require', 'express'], function (require) {
    var express = require('express');

    var app = express();
    var port = 8300;

    //app.use(express.static(__dirname + '/server'));
    //app.use(express.static(__dirname + '/public'));
    app.use('/', routesApi);
    app.use(function(req, res) {
        res.sendFile(path.join(__dirname, '/public', 'index.html'));
    });

    app.get('*', function(req, res) {
        res.sendfile('/src/index.html');
    });



    app.listen(port, function(){
        console.log('server is running on ' + port);
    });

});