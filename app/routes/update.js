module.exports = (req, res) => {
  req.log.info("request received");

  res.send({
    message: `Flight id:${req.params.id}, departureTime: ${
      req.body.departureTime
    }`
  });
};
