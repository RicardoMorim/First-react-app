import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

class DishDetailComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onDishSelect(dish) {
    this.setState({ selectedDish: dish });
  }

  renderDish(dish) {
    if (dish != null) {
      return (
        <div className="col-12 col-md-5 m-1">
          <Card>
            <CardImg
              width="100%"
              src={this.props.dish.image}
              alt={this.props.dish.name}
            />
            <CardBody>
              <CardTitle>{this.props.dish.name}</CardTitle>
              <CardText>{this.props.dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  renderDetails(comments) {
    if (comments == null) {
      return <div></div>;
    }
    const DishDetailComponent = comments.map((comment) => {
      /* Tentativa acertada de converter as datas destas ("2015-02-13T17:57:28.556094Z") para datas americanas, porém depois descobri a função
       que acabei por usar mas não quis apagar isto pois deu bastante trabalho :D */
    
      /*
      var a = comment.date.split("");
      var mes = a.slice(5, 7);
      var dia = (a.slice(8,9)+a.slice(9,10))
      var ano = a.slice(0,4)
      var meses = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      */
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
      </div>
    );
  }

  render() {
    const dish = this.props.dish;
    if (dish == null) {
      return <div></div>;
    }
    const dishItem = this.renderDish(dish);
    const commentItem = this.renderDetails(dish.comments);
    return (
      <div className="container">
        <div className="row">
          {dishItem}
          {commentItem}
        </div>
      </div>
    );
  }
}
export default DishDetailComponents;
