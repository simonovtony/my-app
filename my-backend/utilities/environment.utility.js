
class Environment {
    static getEnvironment() {
        let env = process.argv.find(v => v.startsWith('--env='));

        if (!env) env = '--env=dev';
        
        ([,env] = env.split('='));
        
        switch (env) {
            case 'dev':
                env = 'dev';
                break;
            case 'prod':
                env = 'prod';
                break;
            case 'test':
                env = 'test';
                break;
            default:
                env = 'dev';
        }

        return env;
    }
}

module.exports = Environment;