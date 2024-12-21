import React, { useEffect, useState } from "react";
import { Col, Container, FormGroup, Row, Form, Label } from "reactstrap";
import "../Style/UserLogin.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Features/UserSlice";
import { LoginValidations } from "../Validations/LoginValidations";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // New state for password visibility toggle

  const userD = useSelector((state) => state.counter.user);
  const isSucces = useSelector((state) => state.counter.isSucces);
  const isError = useSelector((state) => state.counter.isError);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginValidations),
  });

  const onSubmit = (data) => {
    dispatch(getUser({ email, password }));
  };

  useEffect(() => {
    if (userD && isSucces) navigate("/EventList");
    if (isError) navigate("/UserLogin");
  }, [isSucces, isError, userD]);

  return (
    <Container fluid>
      <Row className="Row1">
        <Col className="col1">
          <Form className="LoginForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="Heading1">
              <h1>Welcome back!</h1>
              <p>Enter your Credentials to access your account:</p>
            </div>

            {/* Email Field */}
            <FormGroup>
              <Label className="inputLabel">Email address</Label>
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control"
                {...register("email", {
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                })}
              />
              <p className="error">{errors.email?.message}</p>
            </FormGroup>

            {/* Password Field with Eye Icon */}
            <FormGroup className="password-container">
              <Label className="inputLabel">Password</Label>
              <div className="password-input">
                <input
                  type={passwordVisible ? "text" : "password"} // Toggle between text and password
                  placeholder="Enter your password"
                  className="form-control"
                  {...register("password", {
                    value: password,
                    onChange: (e) => setPassword(e.target.value),
                  })}
                />
                {/* Eye Icon to Toggle Password Visibility */}
                <span
                  className="password-eye"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />} {/* Use emoji or icon */}
                </span>
              </div>
              <p className="error">{errors.password?.message}</p>
            </FormGroup>

            {/* Login Button */}
            <FormGroup>
              <button type="submit" className="loginbutton">
                Login
              </button>
            </FormGroup>

            <FormGroup>
              <button
                className="loginbutton2"
                onClick={() => {
                  navigate("/");
                }}
              >
                Go back
              </button>
            </FormGroup>

            {/* OR Divider */}
            <FormGroup>
              <div className="line-container">
                <div className="line"></div>
                <span className="line-text">or</span>
                <div className="line"></div>
              </div>
            </FormGroup>

            {/* Sign Up Link */}
            <FormGroup className="fl">
              <Label>
                Don't have an Account? <Link to="/register">Sign Up Now</Link>
              </Label>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
