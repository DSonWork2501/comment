const path = require('path')

module.exports = function (app, express) {
    app.use(express.json());       // to support JSON-encoded bodies
    app.use(express.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));

    app.use(express.static(path.join(__dirname, '../build')));
    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, '../build', 'index.html'));
      });

    return app
}