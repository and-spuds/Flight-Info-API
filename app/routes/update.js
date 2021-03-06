const publishSNS = require("../lib/aws/aws").publishSNS;
const logger = require("pino")();

module.exports = (req, res) => {
  req.log.info("request received");

  res.send({
    message: `Flight id:${req.params.id}, departureTime: ${
      req.body.departureTime
    }`
  });

  let snsPayload = {
    flightID: req.params.id,
    departureTime: req.body.departureTime
  };

  let topicArn = "arn:aws:sns:eu-west-2:122275815213:spuds-flight-update";

  try {
    publishSNS(snsPayload, topicArn);
  } catch (error) {
    /* istanbul ignore next */
    logger.error(error.message);
  }
};
