const publishSNS = require("../app/lib/aws/aws").publishSNS;

describe("AWS Publish", () => {
  it("It should throw TypeError when payload is empty", () => {
    expect(() => {
      publishSNS(undefined);
    }).toThrow("payload is not an object");
  });

  it("It should throw Error when topicArn is empty", () => {
    expect(() => {
      publishSNS({});
    }).toThrow("Topic ARN is not valid");
  });
});
