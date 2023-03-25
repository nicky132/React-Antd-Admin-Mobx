const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        createProxyMiddleware(
            '/admin', {
                // pathRewrite: { '^/admin': '/admin' },//这里可以定义重写规则
                target: 'http://localhost:8088',
                changeOrigin: true, // target是域名的话，需要这个参数，
                secure: false,
            }
        )
    );
};