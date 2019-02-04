import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter, Switch, Route } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Menu } from 'semantic-ui-react';
import Amplify, { Auth, PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';
import config from '../config';
import { connect } from 'react-redux';

/*import { authValidation, errorAuthenticating, isAuthenticated } from './actions/authenticate';
import { attachIotPolicy } from "./libs/awsMqtt";
import Routes from "./Routes";*/

import './App.css';
import home from '../containers/Home'
import Spinner from './Spinner';
import { handleSignOut, loggedInStatusChanged } from '../actions/authActions';
import * as IoT from '../libs/aws-iot';
import { acquirePublicPolicies, deviceConnectedStatusChanged, attachMessageHandler } from '../actions/iotActions';
import RootRouter from './Routers/RootRouter';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      enterApp: false,
    };
    this.signOut = this.signOut.bind(this);
  }

  componentWillMount() {
    this.validateUserSession();
  }

  componentDidMount() {
    const connectCallback = () => this.props.deviceConnectedStatusChanged(true);
    const closeCallback = () => this.props.deviceConnectedStatusChanged(false);
    this.props.acquirePublicPolicies(connectCallback, closeCallback);
  }

  componentWillReceiveProps(nextProps) {
    const {
      connectPolicy,
      publicPublishPolicy,
      publicSubscribePolicy,
      publicReceivePolicy,
      deviceConnected,
      identityId,
    } = nextProps;

    if (connectPolicy &&
      publicPublishPolicy &&
      publicSubscribePolicy &&
      publicReceivePolicy &&
      deviceConnected) {
      // Ping to test connection
      const topic = `public/ping/${identityId}`;
      IoT.publish(topic, JSON.stringify({ message: 'connected' }));
      // Attach message handler if not yet attached
      this.props.attachMessageHandler();
      this.setState({
        enterApp: true,
      });
    }
  }

  validateUserSession() {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
      this.props.loggedInStatusChanged(true);
    } else {
      this.props.loggedInStatusChanged(false);
    }
  }

  signOut(e) {
    e.preventDefault();
    this.props.handleSignOut();
  }

  renderPageBody() {
    // If we have acquired the necessary policies, render desired page
    if (this.state.enterApp) {
      return (
        <Container>
          <Switch>
            <Route exact path="/app/rooms" component={home} />
            <Route path="/" component={home} />
          </Switch>
        </Container>
      );
    }

    // Otherwise display a loading spinner until API calls have succeeded
    return (
      <Route
        path="/"
        component={Spinner}
      />
    );
  }

  render() {
    const { loggedIn } = this.props;
    if (!loggedIn) {
      return (<RootRouter />);
    }

    return (
      <div>
        <Menu
          fixed="top"
        >
          <Menu.Item><Link to="/app/rooms">Rooms</Link></Menu.Item>
          <Menu.Item onClick={this.signOut}>Log out</Menu.Item>
        </Menu>
        { this.renderPageBody() }
      </div>
    );
  }
}

App.propTypes = {
  handleSignOut: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  loggedInStatusChanged: PropTypes.func.isRequired,
  acquirePublicPolicies: PropTypes.func.isRequired,
  connectPolicy: PropTypes.bool.isRequired,
  publicPublishPolicy: PropTypes.bool.isRequired,
  publicSubscribePolicy: PropTypes.bool.isRequired,
  publicReceivePolicy: PropTypes.bool.isRequired,
  deviceConnected: PropTypes.bool.isRequired,
  deviceConnectedStatusChanged: PropTypes.func.isRequired,
  identityId: PropTypes.string.isRequired,
  attachMessageHandler: PropTypes.func.isRequired,
};

const mapStateToProps = (state => ({
  loggedIn: state.auth.loggedIn,
  connectPolicy: state.iot.connectPolicy,
  publicPublishPolicy: state.iot.publicPublishPolicy,
  publicSubscribePolicy: state.iot.publicSubscribePolicy,
  publicReceivePolicy: state.iot.publicReceivePolicy,
  deviceConnected: state.iot.deviceConnected,
  identityId: state.auth.identityId,
}));

const mapDispatchToProps = {
  handleSignOut,
  loggedInStatusChanged,
  acquirePublicPolicies,
  deviceConnectedStatusChanged,
  attachMessageHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

  /*render() {
    const childProps = {
      isAuthenticated: this.props.isAuthenticated
      //,userHasAuthenticated: this.props.userHasAuthenticated
    };

    return (
      !this.props.isAuthenticating &&
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Dogs</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.props.isAuthenticated
                ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                : <Fragment>
                    <LinkContainer to="/signup">
                      <NavItem>Signup</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <NavItem>Login</NavItem>
                    </LinkContainer>
                  </Fragment>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
    //isAuthenticated: state.isAuthenticated,
    //isAuthenticating: state.isAuthenticating
  }
}

const MapDispatchToProps = (dispatch) => {
  return {
    authValidation: (credentials) => dispatch(authValidation(credentials)),
    errorAuthenticating: () => dispatch(errorAuthenticating()),
    logout: () => dispatch(isAuthenticated(false))
  }
}

export default withRouter(connect(mapStateToProps, MapDispatchToProps)(App));
*/
