import React from 'react';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';

class AppNavBar extends React.Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <React.Fragment>
        <span className='navbar-text' style={{ fontWeight: '600' }}>
          {user ? `Welcome ${user.name}` : ''}
        </span>
        <NavItem>
          <Logout />
        </NavItem>
      </React.Fragment>
    );

    const guestLinks = (
      <React.Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </React.Fragment>
    );

    return (
      <div>
        <Navbar color='dark' dark expand='sm' className='mb-3'>
          <Container>
            <NavbarBrand href='/'>Shopping List</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default connect(state => ({ auth: state.auth }))(AppNavBar);
