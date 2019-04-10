const fs = require('fs');
const mkdirp = require('mkdirp');
const config = require('../../utils/config');

class LocalEngine {
    constructor() {
        this.config = null;

        this.prepareConfigs();

        this.validate();

        this.checkDir();
    }

    write(tempPath) {
        // get file name
        const name = tempPath.split('/').pop();

        // move the file from tempPath to this.config.path
        fs.renameSync(tempPath, this.config.path + "/" + name);
    }

    checkDir(path) {
        mkdirp.sync(path);
    }

    validate() {
        if (!this.config.path) throw Error("on engine Local, you must define a path to save the dumps");
    }

    prepareConfigs() {
        this.config = {
            type: 'local',
            path: config.get('path')
        }
    }
}

module.exports = LocalEngine;


