import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });

var poolData = { 
    UserPoolId : 'us-east-1_lZyNzxLpl',
    ClientId : '7a470d45rirfsjbd01llt6em0s'
};

export const userPool = new AWS.CognitoIdentity.CognitoUserPool(poolData);

export default userPool;