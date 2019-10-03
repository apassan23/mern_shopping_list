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
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { REGISTER_FAIL } from '../../actions/types';

class RegisterModal extends React.Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
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

    const { name, email, password } = this.state;

    // create a new user
    const newUser = {
      name,
      email,
      password
    };
    this.props.register(newUser);
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error && error.id === REGISTER_FAIL) {
      this.setState({ msg: error.msg.msg });
    }
    if (this.state.modal && isAuthenticated) this.toggle();
  }

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href='#'>
          Register
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={event => this.onSubmit(event)}>
              <FormGroup>
                <Label for='name'>Name</Label>
                <Input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Name'
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
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
                Register
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
  register: body => register(body, dispatch),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterModal);
