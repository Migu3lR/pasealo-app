import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });

export const iotdata = new AWS.IotData({endpoint: 'a1ibjimaoot6ov.iot.us-east-1.amazonaws.com'});

export default iotdata;