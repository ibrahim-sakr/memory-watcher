# Memory-watcher

[![Build Status](https://travis-ci.org/IslamWahid/hotels-api.svg?branch=master)](https://travis-ci.org/IslamWahid/hotels-api)
[![npm version](https://badge.fury.io/js/memory-watcher.svg)](https://badge.fury.io/js/memory-watcher)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)


## Installation

`npm i memory-watcher`

note: you need Node js version >= 8

## Usage

 (optional) create directory for the dumps to be saved into
  
```shell
cd project_directory
mkdir dumps
```

 then you can start using the library by providing the path to the directory
 you created.

```javascript
const path = require('path');
const memoryWatcher = require('memory-watcher');

const localConfig = {
  "env": "dev",
  "engine": "local",
  "path": path.join(__dirname, 'dumps')
};

const s3Config = {
  "env": "dev",
  "engine": "s3",
  "access_key_id": "",
  "secret_access_key": "",
  "bucket": "",
  "key": ""
};

memoryWatcher.init(localConfig); // or s3Config

memoryWatcher.watch();
```

## Description

  Using this library you can detect memory leaks in your app and debug them easily even on production environment.
  
  at the beginning we start a `heapProfile`

  once there's a leak in your app, a `heapProfile` is written at this point to the provided path
  so you can check and detect which part of your code is causing the leak, this is very suitable in production.

  In `development` environment, an extra work will be done at the start we will write an init `heapDump` and when there's a leak we will write another `heapDump` so you can use both the `heapDump`s and `heapProfile`s to detect the leak in your application.
