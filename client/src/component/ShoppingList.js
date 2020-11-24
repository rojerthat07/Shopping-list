import React, { Component } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem, addItem } from "../actions/itemAction";
import PropTypes from "prop-types";

class ShoppingList extends Component {
  state = {
    modal: false,
    name: "",
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name: this.state.name,
    };

    //Add item via addItem action
    this.props.addItem(newItem);

    //Close modal
    this.toggle();
  };
  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  };
  render() {
    const { items } = this.props.item;

    return (
      <Container>
        {" "}
        <div>
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Add Item
          </Button>

          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Add to Shopping List</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="item">Item</Label>
                  <Input
                    type="text"
                    name="name"
                    id="item"
                    placeholder="Add shopping item"
                    onChange={this.onChange}
                  ></Input>
                  <Button color="dark" style={{ marginTop: "2rem" }} block>
                    Add Item
                  </Button>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>
        </div>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => this.onDeleteClick(_id)}
                  >
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { getItems, deleteItem, addItem })(
  ShoppingList
);
