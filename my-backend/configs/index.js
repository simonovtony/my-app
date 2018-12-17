
const utilities = require('../utilities');
const environment = utilities.environment;

module.exports = {
    env: environment.getEnvironment(),
    server: {
        http: {
            enabled: true,
            host: '127.0.0.1',
            port: 7000
        },
        https: {
            enabled: true,
            host: '127.0.0.1',
            port: 7001
        }
    }
};