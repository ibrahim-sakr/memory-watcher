const AWS = require('aws-sdk');
const log = require('../../utils/log');
const config = require('../../utils/config');

class S3Engine {
    constructor(configs) {
        this.config = null;
        this.s3 = null;

        this.prepareConfigs();

        this.validate();

        this.checkConnection();
    }

    write(tempPath) {
        // upload the tempPath to S3
        if (!this.s3) throw Error("the S3 Instance didn't Initiated properly")

        this.s3.upload(this.config.params, (err, data) => {
            if (err) log("Error " + err, 'error');

            //success
            if (data) {
                log("Uploaded in: " + data.Location, 'log');
            }
        });
    }

    checkConnection(config) {
        try {
            AWS.config.update({
                accessKeyId: config.accessKeyId,
                secretAccessKey: config.secretAccessKey
            });

            this.s3 = new AWS.S3();
        } catch (e) {
            throw Error("can't connect to S3 Instance");
        }
    }

    validate() {
        if (!this.config.connection.accessKeyId) throw Error("on engine S3, you must define a accessKeyId.");
        if (!this.config.connection.secretAccessKey) throw Error("on engine S3, you must define a secretAccessKey.");
        if (!this.config.params.Body) throw Error("on engine S3, you must define a Body.");
        if (!this.config.params.Bucket) throw Error("on engine S3, you must define a Bucket.");
        if (!this.config.params.Key) throw Error("on engine S3, you must define a Key.");
    }

    prepareConfigs() {
        this.config = {
            type: 's3',
            connection: {
                accessKeyId: config.get('access_key_id'),
                secretAccessKey: config.get('secret_access_key')
            },
            params: {
                Body: "",
                Bucket: config.get('bucket'),
                Key: config.get('key')
            }
        }
    }
}

module.exports = S3Engine;
