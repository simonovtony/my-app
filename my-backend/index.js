const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const configs = require('./configs');
const routers = require('./routers');
const serverConfigs = configs.server;

const Koa = require('koa');
const logger = require('koa-logger');

const app = new Koa();

let httpServer;
let httpsServer;

app.use(logger());

const apiRouter = routers.api;
app.use(apiRouter.routes())
   .use(apiRouter.allowedMethods());

const webRouter = routers.web;
app.use(webRouter.routes())
   .use(webRouter.allowedMethods());

const httpConfigs = serverConfigs.http;
if (httpConfigs.enabled) {
    httpServer = new http.Server(app.callback());
    httpServer.listen(httpConfigs.port, httpConfigs.host, 
        () => console.log(`Http server is running on ${httpConfigs.host}:${httpConfigs.port}`))
}

const httpsConfigs = serverConfigs.https;
if (httpsConfigs.enabled) {
    httpsServer = new https.Server({
        key: fs.readFileSync(path.resolve(__dirname, 'storage', 'ssl', 'server-key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, 'storage', 'ssl', 'server-cert.pem')),
    }, app.callback());
    httpsServer.listen(httpsConfigs.port, httpsConfigs.host, 
        () => console.log(`Https server is running on ${httpsConfigs.host}:${httpsConfigs.port}`))
}

module.exports = {
    app,
    httpServer,
    httpsServer,
}