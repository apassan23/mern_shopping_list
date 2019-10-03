import React from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends React.Component {
  state = {
    modal: false,
    name: ''
  };

  static propTypes = {
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const newItem = {
      name: this.state.name
    };
    this.props.addItem(newItem);
    this.toggle();
  };

  render() {
    const { isAuthenticated, isLoading } = this.props;
    return (
      <div>
        {isAuthenticated ? (
          <Button
            color='dark'
            style={{ marginBottom: '2rem' }}
            onClick={this.toggle}
          >
            Add Item
          </Button>
        ) : (
          <h4 className='mb-4 ml-4 lead'>
            {isLoading ? 'Loading...' : 'Please log in to manage items'}
          </h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add to Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={event => this.onSubmit(event)}>
              <FormGroup>
                <Label for='item'>Item</Label>
                <Input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Add Shopping Item'
                  onChange={event => this.handleChange(event)}
                />
                <Button
                  color='success'
                  className='btn-block mt-3'
                  type='submit'
                >
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.item.loading
});

export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);
