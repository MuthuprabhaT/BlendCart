import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  // Get redirect URL from the URL parameters
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      // Improved error handling with specific message
      toast.error(error?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <FormContainer className="d-flex justify-content-center align-items-center">
      <h1 className="d-flex fw-bold justify-content-center ">Sign In</h1>
      {error && (
        <p className="text-danger">
          {error.data?.message || "Invalid credentials"}
        </p>
      )}
      <Form onSubmit={submitHandler} className=" p-2 rounded shadow-lg">
        <Form.Group controlId="email" className="my-3">
          <Form.Label className="fw-bold">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required // Ensure email is required
          />
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label className="fw-bold">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required // Ensure password is required
          />
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="btn px-5 mt-2"
          disabled={isLoading} // Disable button during loading
        >
          Sign In
        </Button>
        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col className="fst-italic">
          Don't have an account?{" "}
          <Link
            className="text-decoration-none"
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
