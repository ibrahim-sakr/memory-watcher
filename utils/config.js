let configs = require('../config.json');

const validateConfig = (configs) => {
    if (!configs.path) throw Error("you must define a path to save the dumps");
};

module.exports.set = (userConfigs = {}) => {
    validateConfig(userConfigs);
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

