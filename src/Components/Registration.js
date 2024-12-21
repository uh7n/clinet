import React, { useState } from "react";
import { Form, Label, Container, Row, Col, FormGroup } from "reactstrap";
import '../Style/UserReg.css';

import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { insertUser } from "../Features/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegValidations } from "../Validations/RegValidations";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const Registration = () => {

  const navigate = useNavigate();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [ProfilePic, setProfilePic] = useState("");

  
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const msg = useSelector((state) => state.counter.message);

  const {
    register,
    handleSubmit: submitForm,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegValidations),
  });

  const handleSubmit = (data) => {
    const user = {
      name: name,
      email: email,
      password: password,
      image: ProfilePic
    };
    dispatch(insertUser(user));
  };

  return (
    <Container fluid>
      <Row className='Row2'>
        <Col className='Col2'>
          <Form className='LoginForm2'>
            <div className='Header2'>
              <h1>Get Started Now</h1>
              <p>Enter your Credentials to access your account:</p>
            </div>
            <h5 className="messageRetunBack">{msg}</h5>

            <Row form>
              {/* Left Column */}
              <Col md={6}>
                <FormGroup>
                  <Label className='inputLabel'>Name</Label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter your name'
                    {...register("Fname", {
                      onChange: (e) => setName(e.target.value),
                    })}
                    value={name}
                  />
                  <p className="error">{errors.Fname?.message}</p>
                </FormGroup>

                <FormGroup>
                  <Label className='inputLabel'>Email address</Label>
                  <input
                    type='email'
                    className='form-control'
                    placeholder='Enter your email'
                    {...register("email", {
                      onChange: (e) => setEmail(e.target.value),
                    })}
                    value={email}
                  />
                  <p className="error">{errors.email?.message}</p>
                </FormGroup>
              </Col>

              {/* Right Column */}
              <Col md={6}>
                <FormGroup>
                  <Label className='inputLabel'>Password</Label>
                  <div className="password-input">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      className='form-control'
                      placeholder='Enter your password'
                      {...register("password", {
                        onChange: (e) => setPassword(e.target.value),
                      })}
                      value={password}
                    />
                    <span
                      className="password-eye"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <p className="error">{errors.password?.message}</p>
                </FormGroup>

                <FormGroup>
                  <Label className='inputLabel'>Confirm Password</Label>
                  <div className="password-input">
                    <input
                      type={confirmPasswordVisible ? "text" : "password"}
                      placeholder='Confirm your password'
                      className='form-control'
                      {...register("confirmPassword", {
                        onChange: (e) => setConfirmPassword(e.target.value),
                      })}
                      value={confirmPassword}
                    />
                    <span
                      className="password-eye"
                      onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    >
                      {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <p className="error">{errors.confirmPassword?.message}</p>
                </FormGroup>

              </Col>
                <FormGroup>
                  <Label className='inputLabel'>Profile Picture</Label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="image link.."
                    {...register("imageURL", {
                      onChange: (e) => setProfilePic(e.target.value),
                    })}
                    value={ProfilePic}
                  />
                  <p className="error">{errors.imageURL?.message}</p>
                </FormGroup>
            </Row>

            <FormGroup>
              <button
                className="Regbutton"
                onClick={submitForm(handleSubmit)}
              >
                Signup
              </button>
            </FormGroup>

            <FormGroup>
              <button
                className="Regbutton2"
                onClick={() => { navigate("/") }}
              >
                Go back
              </button>
            </FormGroup>

            <FormGroup>
              <div className="line-container">
                <div className="line"></div>
                <span className="line-text">or</span>
                <div className="line"></div>
              </div>
            </FormGroup>

            <FormGroup className='fl'>
              <Label>
                Have an account?
                <Link to='/UserLogin'> Sign In</Link>
              </Label>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;
