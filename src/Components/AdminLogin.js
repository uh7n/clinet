import React, { useEffect, useState } from "react";
import { Col, Container, FormGroup, Row, Form, Label, Button } from "reactstrap";

import "../Style/AdminLogin.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAdmin } from "../Features/AdminSlice";
import { LoginValidations } from "../Validations/LoginValidations";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const AdminData = useSelector((state) => state.administration.Admins);
  const isSucces = useSelector((state) => state.administration.isSucces);
  const isError = useSelector((state) => state.administration.isError);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit: submitForm,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginValidations),
  });

  const handleSubmit = (data) => {
    const Admins = {
      email,
      password,
    };
    dispatch(getAdmin(Admins));
  };

  useEffect(() => {
    if (AdminData && isSucces) navigate("/AdminHome");
    if (isError) navigate("/AdminLogin");
  }, [isSucces, isError, AdminData, navigate]);

  return (
    <Container fluid className="admin-container">
      <Row className="justify-content-center">
        <Col md="4">
          <Form className="admin-form" onSubmit={submitForm(handleSubmit)}>
            <div className="form-header">
              <h1>Admin Login</h1>
            </div>
            <FormGroup>
              <Label className="form-label">Admin Email</Label>
              <input
                type="email"
                placeholder="Enter your Admin email"
                className="form-control"
                {...register("email", {
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                })}
              />
              <p className="error">{errors.email?.message}</p>
            </FormGroup>

            <FormGroup>
              <Label className="form-label">Admin Password</Label>
              <input
                type="password"
                placeholder="Enter your Admin password"
                className="form-control"
                {...register("password", {
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                })}
              />
              <p className="error">{errors.password?.message}</p>
            </FormGroup>

            <FormGroup>
              <button type="submit" className="btn-login">
                Login
              </button>
              <button className="btn-back"
                onClick={() => {navigate("/")}}>
                Go back
              </button>
            </FormGroup>

            <FormGroup>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLogin;
