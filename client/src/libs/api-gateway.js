import AWS from 'aws-sdk';
import * as log from 'loglevel';

import Config from '../config';
import { authUser } from './aws-cognito';
import sigV4Client from './sigV4Client';

export const invokeAPIGateway = async ({
  path,
  method = 'GET',
  headers = {},
  queryParams = {},
  body,
}) => {
  if (!await authUser()) {
    throw new Error('User is not logged in');
  }

  const client = sigV4Client.newClient({
    accessKey: AWS.config.credentials.accessKeyId,
    secretKey: AWS.config.credentials.secretAccessKey,
    sessionToken: AWS.config.credentials.sessionToken,
    region: Config.awsRegion,
    endpoint: Config.awsApiGatewayInvokeUrl,
  });

  const signedRequest = client.signRequest({
    method,
    path,
    headers,
    queryParams,
    body,
  });

  const signedBody = body ? JSON.stringify(body) : body;
  const signedHeaders = signedRequest.headers;

  const results = await fetch(signedRequest.url, {
    method,
    headers: signedHeaders,
    body: signedBody,
  });

  if (results.status !== 200) {
    throw new Error(await results.text());
  }

  return results.json();
};

export const attachConnectPolicy = async () => {
  try {
    await invokeAPIGateway({
      path: '/policy/attach_connect',
      method: 'POST',
      body: {},
    });
  } catch (error) {
    log.error(error);
  }
};

export const attachPublicPublishPolicy = async () => {
  try {
    await invokeAPIGateway({
      path: '/policy/attach_public_publish',
      method: 'POST',
      body: {},
    });
  } catch (error) {
    log.error(error);
  }
};

export const attachPublicSubscribePolicy = async () => {
  try {
    await invokeAPIGateway({
      path: '/policy/attach_public_subscribe',
      method: 'POST',
      body: {},
    });
  } catch (error) {
    log.error(error);
  }
};

export const attachPublicReceivePolicy = async () => {
  try {
    await invokeAPIGateway({
      path: '/policy/attach_public_receive',
      method: 'POST',
      body: {},
    });
  } catch (error) {
    log.error(error);
  }
};

export const createUser = async (username) => {
  let result;
  try {
    result = await invokeAPIGateway({
      path: '/users',
      method: 'POST',
      body: { username },
    });
  } catch (error) {
    log.error(error);
  }
  return result;
};

export const fetchUser = async (identityId) => {
  const result = await invokeAPIGateway({
    path: `/users/${encodeURIComponent(identityId)}`,
    method: 'GET',
  });

  return result;
};

export const fetchAllChats = async () => {
  const result = await invokeAPIGateway({
    path: '/chats',
    method: 'GET',
  });

  return result;
};

export const createChat = async (roomName, type) => {
  const result = await invokeAPIGateway({
    path: '/chats',
    method: 'POST',
    body: {
      roomName,
      type,
    },
  });

  return result;
};