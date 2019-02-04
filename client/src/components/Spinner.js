import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Segment, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';

import LoadingText from './LoadingText';

const styles = {
  segment: {
    height: '500px',
    marginTop: '2em',
  },
};

export const Spinner = props => (
  <Segment style={styles.segment} size="massive">
    <Dimmer active inverted>
      <Loader size="massive">
        <LoadingText
          condition={props.connectPolicy}
          verbPresent="ACQUIRING"
          verbPast="ACQUIRED"
        >
          IoT connect policy
        </LoadingText>
        <LoadingText
          condition={props.publicPublishPolicy}
          verbPresent="ACQUIRING"
          verbPast="ACQUIRED"
        >
          IoT publish policy
        </LoadingText>
        <LoadingText
          condition={props.publicSubscribePolicy}
          verbPresent="ACQUIRING"
          verbPast="ACQUIRED"
        >
          IoT subscribe policy
        </LoadingText>
        <LoadingText
          condition={props.publicReceivePolicy}
          verbPresent="ACQUIRING"
          verbPast="ACQUIRED"
        >
          IoT receive policy
        </LoadingText>
        <LoadingText
          condition={props.deviceConnected}
          verbPresent="CONNECTING"
          verbPast="CONNECTED"
        >
          IoT device
        </LoadingText>
      </Loader>
    </Dimmer>
  </Segment>
);

Spinner.propTypes = {
  connectPolicy: PropTypes.bool.isRequired,
  publicPublishPolicy: PropTypes.bool.isRequired,
  publicSubscribePolicy: PropTypes.bool.isRequired,
  publicReceivePolicy: PropTypes.bool.isRequired,
  deviceConnected: PropTypes.bool.isRequired,
};

const mapStateToProps = (state => ({
  connectPolicy: state.iot.connectPolicy,
  publicPublishPolicy: state.iot.publicPublishPolicy,
  publicSubscribePolicy: state.iot.publicSubscribePolicy,
  publicReceivePolicy: state.iot.publicReceivePolicy,
  deviceConnected: state.iot.deviceConnected,
}));

export default connect(mapStateToProps)(Spinner);