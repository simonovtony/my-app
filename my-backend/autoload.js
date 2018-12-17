const fs = require('fs');
const path = require('path');
const _ = require('lodash');

class Autoload {
    /**
     * load every modules by dirname into object
     * @param {string} dirpath 
     * @param {RegExp} [regex]
     * @param {string} [replace]
     */
    static load(dirpath, regex, replace) {
        const modules = {};
        const filenames = fs.readdirSync(dirpath);
        filenames.forEach(filename => {
            let key = filename, value = require(path.resolve(dirpath, filename));
            if (_.isRegExp(regex)) {  
                if (regex.test(filename)) {
                    if (_.isString(replace)) {
                        key = filename.replace(regex, replace);
                    }
                    modules[key] = value;
                }
            } else {
                modules[key] = value;
            }
        });
        return modules;
    }
}

module.exports = Autoload;