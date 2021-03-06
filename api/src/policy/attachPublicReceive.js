import * as iot from '../helpers/aws-iot';
import { success, failure } from '../helpers/response';

export const POLICY_NAME = 'IotPublicReceivePolicy';

/**
 * Attach a policy to the Cognito Identity to allow it to receive messages from all public rooms
 */
export const main = async (event, context, callback) => {
  const principal = event.requestContext.identity.cognitoIdentityId;

  try {
    await iot.attachPrincipalPolicy(POLICY_NAME, principal);
    callback(null, success({ status: true }));
  } catch (e) {
    if (e.statusCode === 409) {
      // Policy already exists for this cognito identity
      callback(null, success({ status: true }));
    } else {
      console.log(e);
      callback(null, failure({ status: false, error: e }));
    }
  }
};