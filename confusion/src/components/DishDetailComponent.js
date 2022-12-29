import React, { Component } from "react";
import "../App.css";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  Label,
  BreadcrumbItem,
  Button,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";

//// validators
const required = (val) => val && val.length; //value > 0
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

function RenderComments({ comments, addComment, dishId }) {
  if (comments == null) {
    return <div></div>;
  }
  const cmnts = comments.map((comment) => {
    return (
      <li key={comment.id}>
        <p>{comment.comment}</p>
        <p>
          -- {comment.author}, &nbsp;
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
            minute: "2-digit",
          }).format(new Date(comment.date))}
        </p>
      </li>
    );
  });
  return (
    <div className="col-12 col-md-5 m-1">
      <h4> Comments </h4>
      <ul className="list-unstyled">{cmnts}</ul>
      <CommentForm dishId={dishId} addComment={addComment} />
    </div>
  );
}

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCommentFormModalOpen: false,
    };

    this.toggleCommentFormModal = this.toggleCommentFormModal.bind(this);
    this.handleCommentFormSubmit = this.handleCommentFormSubmit.bind(this);
  }

  toggleCommentFormModal() {
    this.setState({
      isCommentFormModalOpen: !this.state.isCommentFormModalOpen,
    });
    // Working well
    console.log(
      "Ive been turned, Current value: " + this.state.isCommentFormModalOpen
    );
  }

  handleCommentFormSubmit(values) {
    console.log("Current State is: " + JSON.stringify(values));
    this.toggleCommentFormModal();
    this.props.addComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
    // alert("Current State is: " + JSON.stringify(values));
  }

  render() {
    return (
      <>
        <Button outline onClick={this.toggleCommentFormModal}>
          <span className="fa fa-comments fa-lg"></span> Submit Comment
        </Button>
        {/* commentform  Modal */}
        {/* Added a div to wrap the modal content and added a className to control the modal's visibility */}
        <div
          className={`modal-overlay ${
            this.state.isCommentFormModalOpen ? "is-open" : "is-closed"
          }`}
          onClick={this.toggleCommentFormModal}
        >
          {/* Added an onClick event to close the modal when the user clicks outside of the modal content */}
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Submit Comment</h3>
              <button onClick={this.toggleCommentFormModal}>X</button>
            </div>

            <div className="modal-body">
              <LocalForm
                onSubmit={(values) => this.handleCommentFormSubmit(values)}
              >
                {/* rating */}
                <div className="form-group row">
                  <Label htmlFor="rating" md={12}>
                    Rating
                  </Label>
                  <div className="col md-12">
                    <Control.select
                      model=".rating"
                      className="form-control"
                      name="rating"
                      id="rating"
                      defaultValue={"1"}
                      validators={{
                        required,
                      }}
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Control.select>
                    <Errors
                      className="text-danger"
                      model=".author"
                      show="touched"
                      messages={{
                        required: "Required",
                      }}
                    />
                  </div>
                </div>
                {/* author */}
                <div className="row form-group">
                  <Label htmlFor="author" md={12}>
                    {" "}
                    Your Name{" "}
                  </Label>
                  <div className="col md-12">
                    <Control.text
                      model=".author"
                      id="author"
                      name="author"
                      placeholder="First Name"
                      className="form-control"
                      validators={{
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(15),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".author"
                      show="touched"
                      messages={{
                        required: "Required",
                        minLength: "Must be greater than 2 characters",
                        maxLength: "Must be 15 characters or less",
                      }}
                    />
                  </div>
                </div>
                {/* comment */}
                <div className="row form-group">
                  <Label htmlFor="comment" md={12}>
                    {" "}
                    Comment{" "}
                  </Label>
                  <div className="col md-12">
                    <Control.textarea
                      model=".comment"
                      id="comment"
                      name="comment"
                      rows="6"
                      className="form-control"
                      validators={{
                        required,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".comment"
                      show="touched"
                      messages={{
                        required: "Required",
                      }}
                    />
                  </div>
                </div>
                {/* submit btn */}
                <div className="form-group row">
                  <div className="col md-12">
                    <Button type="submit" color="primary">
                      {" "}
                      Submit
                    </Button>
                  </div>
                </div>
              </LocalForm>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle> {dish.name}</CardTitle>
            <CardText> {dish.description} </CardText>
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return <div></div>;
  }
}

const DishDetail = (props) => {
  const dish = props.dish;

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>

        <div className="col-12">
          <h3> {props.dish.menu}</h3>
          <hr />
        </div>
      </div>

      <div className="row">
        <RenderDish dish={props.dish} />
        <RenderComments comments={props.comments}
        addComment={props.addComment}
        dishId={props.dish.id}
      />
      </div>
    </div>
  );
};

export default DishDetail;
