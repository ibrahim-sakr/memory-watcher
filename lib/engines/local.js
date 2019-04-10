const fs = require('fs');
const mkdirp = require('mkdirp');

class LocalEngine {
    constructor(configs) {
        // {
        //     type: 'local',
        //     path: config.get('path')
        // }
        this.config = configs;

        // check if path exists or create it
        this.checkDir(this.config.path);
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
}

module.exports = LocalEngine;


