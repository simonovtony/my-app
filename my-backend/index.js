const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const configs = require('./configs');
const routers = require('./routers');
const runtimes = require('./runtimes');
const serverConfigs = configs.server;

const Koa = require('koa');
const logger = require('koa-logger');
const static = require('koa-static');
const SocketIO = require('socket.io');

const app = new Koa();

let httpServer;
let httpsServer;
let httpIo;
let httpsIo;

app.use(logger());
app.use(static(path.resolve(__dirname, 'storage', 'public')))

const apiRouter = routers.api;
app.use(apiRouter.routes())
   .use(apiRouter.allowedMethods());

const webRouter = routers.web;
app.use(webRouter.routes())
   .use(webRouter.allowedMethods());

const httpConfigs = serverConfigs.http;
if (httpConfigs.enabled) {
    httpServer = new http.Server(app.callback());
    httpIo = SocketIO(httpServer);
    runtimes(httpIo);
    httpServer.listen(httpConfigs.port, httpConfigs.host, 
        () => console.log(`Http server is running on ${httpConfigs.host}:${httpConfigs.port}`))
}

const httpsConfigs = serverConfigs.https;
if (httpsConfigs.enabled) {
    httpsServer = new https.Server({
        key: fs.readFileSync(path.resolve(__dirname, 'storage', 'ssl', 'server-key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, 'storage', 'ssl', 'server-cert.pem')),
    }, app.callback());
    httpsIo = SocketIO(httpsServer);
    runtimes(httpsIo);
    httpsServer.listen(httpsConfigs.port, httpsConfigs.host, 
        () => console.log(`Https server is running on ${httpsConfigs.host}:${httpsConfigs.port}`))
}

module.exports = {
    app,
    httpServer,
    httpsServer,
}