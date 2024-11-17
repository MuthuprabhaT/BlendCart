import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className=" p-3 rounded shadow h-100">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          style={{ height: "200px" }}
          variant="top"
        />
      </Link>

      <Card.Body>
        <Link
          className="link-underline link-underline-opacity-0"
          to={`/product/${product._id}`}
        >
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">₹ {product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
