

module.exports = function (app) {
    app.get('*', function (req, res) {
        res.sendFile('./public/index.html');
    });

    app.get('/login', function (req, res) {
        res.sendFile('./public/login/index.html');
    });
};