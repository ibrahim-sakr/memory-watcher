const AWS = require('aws-sdk');
const log = require('../../utils/log');

class S3Engine {
    constructor(configs) {
        // {
        //     type: 's3',
        //     config: {
        //         accessKeyId: "",
        //         secretAccessKey: ""
        //     },
        //     params: {
        //         Body: "",
        //         Bucket: "",
        //         Key: ""
        //     }
        // }
        this.config = configs;
        this.s3 = null;

        // check if path exists or create it
        this.checkConnection(this.config.config);
    }

    write(tempPath) {
        // upload the tempPath to S3
        s3.upload(this.config.params, function (err, data) {
            //handle error
            if (err) {
                log("Error " + err, 'error');
            }

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
}

module.exports = S3Engine;
