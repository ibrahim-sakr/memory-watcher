const path = require('path');
const memwatch = require('node-memwatch');
const heapProfile = require('heap-profile');
const heapDump = require('heapdump');
const log = require('./utils/log');
const config = require('./utils/config');
const os = require('os');
const LocalEngine = require('./lib/engines/local');
const S3Engine = require('./lib/engines/s3');

module.exports.init = (configs = {}) => {
  config.set(configs);
};

module.exports.watch = () => {
  // check engine
  const engine = checkEngine();

  startWatching(engine);
}

const checkEngine = () => {
  const engine = config.get('engine');
  switch (config.get('engine')) {
    case 'local':
      return setupLocal();

    case 's3':
      return setupS3();

    default:
      throw Error('type ' + engine + ' is Not Supported only local and s3');
  }
}

const setupLocal = () => {
  const configs = {
    type: 'local',
    path: config.get('path')
  };

  // check if the path exists or create it
  return new LocalEngine(configs);
};

const setupS3 = () => {
  const configs = {
    type: 's3',
    config: {
      accessKeyId: config.get('access_key_id'),
      secretAccessKey: config.get('secret_access_key')
    },
    params: {
      Body: "",
      Bucket: config.get('bucket'),
      Key: config.get('key')
    }
  }

  // try to connect
  return new S3Engine(configs);
};

const startWatching = (engine) => {
  heapProfile.start();
  writeSnapshot('init', engine);

  memwatch.on('leak', (info) => {
    log('memory leak detected!', 'error');
    log(info, 'table');
    writeProfile('leak', engine);
    writeSnapshot('leak', engine);
  });
};

const genarateName = (type, info) => {
  return `${path.sep}${type}-${Date.now()}-${info}.${type}`;
};

const writeProfile = (type, engine) => {
  const path = os.tmpdir() + genarateName('heapprofile', type);
  heapProfile.write(path, (err, filename) => {
    if (err) return log(err, 'error');
    log('heapProfile written to ' + filename, 'info');
    engine.write(path);
  });
};

const writeSnapshot = (type, engine) => {
  if (config.get('env') != 'dev') return;
  const path = os.tmpdir() + genarateName('heapsnapshot', type);
  heapDump.writeSnapshot(path, (err, filename) => {
    if (err) return log(err, 'error');
    log('heapSnapshot written to ' + filename, 'info');
    engine.write(path);
  });
};
