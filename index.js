const path = require('path');
const memwatch = require('node-memwatch');
const heapProfile = require('heap-profile');
const heapDump = require('heapdump');

module.exports = function(dir = __dirname) {
  memwatch.on('leak', function(info) {
    console.error('memory leak detected!');
    console.table(info);
    writeProfile(dir, 'leak');
    if (process.env.NODE_ENV === 'dev') writeSnapshot(dir, 'leak');
  });
  heapProfile.start();
  if (process.env.NODE_ENV === 'dev') writeSnapshot(dir, 'init');
};

const writeProfile = function(dir, type) {
  heapProfile.write(getPath(dir, 'heapprofile', type), function(err, filename) {
    if (err) return console.error(err);
    console.info('heapProfile written to', filename);
  });
};

const writeSnapshot = function(dir, type) {
  heapDump.writeSnapshot(getPath(dir, 'heapsnapshot', type), function(
    err,
    filename
  ) {
    if (err) return console.error(err);
    console.info('heapSnapshot written to', filename);
  });
};

const getPath = function(dir, type, info) {
  return `${dir}${path.sep}${type}-${Date.now()}-${info}.${type}`;
};
