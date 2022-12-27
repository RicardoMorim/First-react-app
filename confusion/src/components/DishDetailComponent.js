import React, { useState } from "react";
import "../App.css"
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";

//Validator
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;




function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return <div></div>;
  }
}

function RenderComments({ comments }) {
  // Add state variables to store the form data
  const [formOpen, setFormOpen] = useState(false);
  const [rating, setRating] = useState("");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  // Add a function to handle form submission
  const handleSubmit = (values) => {
    // Process the form submission here
    alert(
      `Thank you for your comment, ${
        values.name
      }! Form values: ${JSON.stringify(values)}`
    );
    console.log(`Comment submitted! Form values:`, values);
    // Reset the form after submission
    setFormOpen(false);
    setRating("");
    setName("");
    setComment("");
  };

  if (comments == null) {
    return <div></div>;
  } else {
    const DishDetailComponent = comments.map((comment) => {
      return (
        <li key={comments.id}>
          <p>{comment.comment}</p>
          <p>
            -- {comment.author},{" "}
            {new Intl.DateTimeFormat("pt", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(Date.parse(comment.date)))}
          </p>
        </li>
      );
    });

    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>

        <ul className="list-unstyled">{DishDetailComponent}</ul>

        {/* Add a button to toggle the form */}
        <Button outline="secundary" onClick={() => setFormOpen(!formOpen)}>
          <span className="fa fa-edit fa-lg"></span>
          Submit Comment
        </Button>

        {/* Add the form */}
        {formOpen && (
          <div className={formOpen ? "form-fade-in" : "form-fade-out"}>
            {/* Add the backdrop element */}
            <div
              className="backdrop"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 999,
              }}
              onClick={() => setFormOpen(false)}
            ></div>

              <div
                className="form-container"
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "500px",
                  backgroundColor: "#fff",
                  zIndex: 1000,
                }}
              >
                {/* Add the title */}
                <div className="modal-header">
                  <h3>Submit Comment</h3>
                  <button onClick={() => setFormOpen(false)}>X</button>
                </div>
                <LocalForm
                  className="modal-body"
                  onSubmit={(values) => handleSubmit(values)}
                >
                  <div className="form-group">
                    {/* Add the rating select input */}
                    <label htmlFor="rating">Rating</label>
                    <Control.select
                      model=".rating"
                      id="rating"
                      name="rating"
                      className="form-control"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </Control.select>
                  </div>
                  <div className="form-group">
                    {/* Add the name input field */}
                    <label htmlFor="name">Your Name</label>
                    <Control.text
                      model=".name"
                      id="name"
                      name="name"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      validators={{
                        minLength: minLength(3),
                        maxLength: maxLength(15),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".name"
                      show="touched"
                      messages={{
                        minLength: "Must be greater than 2 characters",
                        maxLength: "Must be 15 characters or less",
                      }}
                    />
                  </div>
                  <div className="form-group">
                    {/* Add the comment input field */}
                    <label htmlFor="comment">Comment</label>
                    <Control.textarea
                      model=".comment"
                      id="comment"
                      name="comment"
                      rows="6"
                      className="form-control"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                  {/* Add the submit button */}
                  <Button type="submit" value="submit" color="primary">
                    Submit
                  </Button>
                </LocalForm>
              </div>
          
          </div>
        )}
      </div>
    );
  }
}

const DishDetail = (props) => {
  const dish = props.dish;
  if (dish == null) {
    return <div></div>;
  }
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <h3>{props.dish.name}</h3>
      <hr />
      <div className="row">
        <RenderDish dish={props.dish} />
        <RenderComments comments={props.comments} />
      </div>
    </div>
  );
};

export default DishDetail;
