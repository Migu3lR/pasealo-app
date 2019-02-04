export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "pasealo-hosting-mobilehub-1837135558"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://v3dfcliq23.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_xYYNgendt",
    APP_CLIENT_ID: "43acjvoguli2kvf1boiam5cmqi",
    IDENTITY_POOL_ID: "us-east-1:0c01f66d-e090-4c08-a7a1-f0e2f58ab2e3",
    socialGoogleClientId: "217669932408-rpdfmo8j6piq23vistidjmge9051rmdr.apps.googleusercontent.com"
  },
  iot: {
    REGION: "us-east-1",
    ENDPOINT: "a1ibjimaoot6ov-ats.iot.us-east-1.amazonaws.com",
    mqttDebugLevel: 3    
  },
  logLevel: 4
};