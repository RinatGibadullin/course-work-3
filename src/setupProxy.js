const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    process.env.REACT_APP_API_URL,
    createProxyMiddleware({
      target: process.env.REACT_APP_PROXY_TARGET,
      pathRewrite: {
        [`^${process.env.REACT_APP_API_URL}`]: process.env.REACT_APP_PROXY_POSTFIX,
      },
      changeOrigin: true,
      logLevel: 'debug',
      onProxyReq(proxyReq, req, res) {
        // console.log('REQUEST PROXY!', proxyReq);
        // console.log('REQUEST!', req);
        // console.log('RESPONSE!', res);
      }
    })
  );
};