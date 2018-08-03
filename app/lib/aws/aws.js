const AWS = require("aws-sdk");
const logger = require("pino")();

AWS.config.update({
  accessKeyId: "AKIAJC76R2R3TX2CHBRQ",
  secretAccessKey: "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",
  region: "eu-west-2"
});

const publishSNS = (payload, topicArn) => {
  if (typeof payload !== "object") {
    throw new TypeError("payload is not an object");
  }

  /* istanbul ignore next */
  if (!topicArn || !topicArn.length) {
    throw new Error("Topic ARN is not valid");
  }

  /* istanbul ignore next */
  let params = {
    Message: JSON.stringify(payload),
    TopicArn: topicArn
  };

  /* istanbul ignore next */
  let publishMessagePromise = new AWS.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise();

  /* istanbul ignore next */
  publishMessagePromise
    .then(function(data) {
      logger.info(
        `Message ${params.Message} send sent to the topic ${params.TopicArn}`
      );
      logger.info("MessageID is " + data.MessageId);
    })
    .catch(function(err) {
      logger.error(err, err.stack);
    });
};

module.exports = {
  publishSNS: publishSNS
};
