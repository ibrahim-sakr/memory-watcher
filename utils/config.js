let configs = require('../config.json');

module.exports.set = (userConfigs = {}) => {
    configs = { ...configs, ...userConfigs };
};

module.exports.get = (name = "") => {
    const splits = name.split('.');
    let result = configs[splits[0]];

    for (let i = 1; i < splits.length; i++) {
        result = result[splits[i]];
    }

    return result;
};

