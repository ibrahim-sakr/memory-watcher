const config = require('./config');

module.exports = (message, level = 'log') => {
    if (config.get('env') == 'dev') {
        console[level](message);
    }
};
