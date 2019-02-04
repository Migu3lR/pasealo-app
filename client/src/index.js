import React from 'react';
import ReactDOM from 'react-dom';
//import { BrowserRouter as Router } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import Amplify from "aws-amplify";
import * as log from 'loglevel';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import './index.css';
//import App from './App';
import RootRouter from './components/Routers/RootRouter';
import registerServiceWorker from './registerServiceWorker';
import config from "./config";

log.setLevel(config.logLevel);

Amplify.configure({
    Auth: {
      mandatorySignIn: false,
      region: config.cognito.REGION,
      userPoolId: config.cognito.USER_POOL_ID,
      identityPoolId: config.cognito.IDENTITY_POOL_ID,
      userPoolWebClientId: config.cognito.APP_CLIENT_ID
    },
    Storage: {
      region: config.s3.REGION,
      bucket: config.s3.BUCKET,
      identityPoolId: config.cognito.IDENTITY_POOL_ID
    },
    API: {
      endpoints: [
        {
          name: "api",
          endpoint: config.apiGateway.URL,
          region: config.apiGateway.REGION
        },
      ]
    }
});

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
        <RootRouter />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
