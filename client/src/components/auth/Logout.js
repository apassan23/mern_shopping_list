import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  render() {
    return (
      <Fragment>
        <NavLink onClick={this.props.logout} href='#'>
          Logout
        </NavLink>
      </Fragment>
    );
  }
}

const mapDispatchToProps = { logout };

export default connect(
  null,
  mapDispatchToProps
)(Logout);
