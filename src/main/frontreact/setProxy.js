const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/book',
        createProxyMiddleware({
            target: 'http://localhost:8888',
            changeOrigin:true,
        })
    );
};