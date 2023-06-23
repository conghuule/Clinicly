const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/auth/login', {
      target: 'https://clinicly.fly.dev/api/v1',
      changeOrigin: true,
    }),
  );
};
