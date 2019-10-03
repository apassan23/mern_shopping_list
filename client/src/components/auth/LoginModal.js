import React from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { LOGIN_FAIL } from '../../actions/types';

class LoginModal extends React.Component {
  state = {
    modal: false,
    email: '',
    password: '',
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  toggle = () => {
    //Clear Errors
    if (this.props.error.status) this.props.clearErrors();

    this.setState({ modal: !this.state.modal, msg: null });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();

    const { email, password } = this.state;

    const user = { email, password };

    // Attempt to login
    this.props.login(user);
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error && error.id === LOGIN_FAIL) {
      this.setState({ msg: error.msg.msg });
    }
    if (this.state.modal && isAuthenticated) this.toggle();
  }

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href='#'>
          Login
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={event => this.onSubmit(event)}>
              <FormGroup>
                <Label for='email'>Email</Label>
                <Input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email'
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
              <FormGroup>
                <Label for='password'>Password</Label>
                <Input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Password'
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
              <Button color='success' className='btn-block mt-3' type='submit'>
                Login
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  login: body => login(body, dispatch),
  clearErrors
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal);
