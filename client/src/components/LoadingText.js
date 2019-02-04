import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';


const LoadingText = props => (
  <Header
    size="tiny"
    color={props.condition ? 'teal' : 'red'}
  >
    { props.condition ? '' : `${props.verbPresent} ` }
    {props.children}
    { props.condition ? ` ${props.verbPast}.` : '...' }
  </Header>
);

LoadingText.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]),
  verbPresent: PropTypes.string.isRequired,
  verbPast: PropTypes.string.isRequired,
  condition: PropTypes.bool.isRequired,
};

LoadingText.defaultProps = {
  children: null,
};

export default LoadingText;