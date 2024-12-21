// Desc: Home page component
import React from "react";
import {
  Col,
  Container,
  Row,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import "../Style/Home.css";

const Home = () => {
  return (
    <Container className="homePage bg-light">
      <Row className="text-center">
        <Col>
          <h1 className="header_1">Welcome to Event Booking</h1>
        </Col>
      </Row>

      <div className="centered-div">
        <Card className="bordered-card">
          <Row>
            <Col md={6} className="border-right-column">
              <CardBody>
                <h1 className="mb-3">Types Of Events</h1>
                <ListGroup>
                  <ListGroupItem>Concerts</ListGroupItem>
                  <ListGroupItem>Festivals</ListGroupItem>
                  <ListGroupItem>Workshops</ListGroupItem>
                  <ListGroupItem>Conferences</ListGroupItem>
                  <ListGroupItem>Exhibitions</ListGroupItem>
                  <ListGroupItem>Sports Events</ListGroupItem>
                  <ListGroupItem>Theater Performances</ListGroupItem>
                </ListGroup>
              </CardBody>
            </Col>

            <Col md={6}>
              <CardBody>
                <h2 className=" mb-3">Featured Events</h2>
                <div>
                  <p>
                    <strong>Rock Night – Music Concert</strong>
                  </p>
                  <h6>• Date: November 15, 2024</h6>
                  <h6>• Location: Al Bustan Palace, Muscat</h6>
                  <hr />
                </div>
                <div>
                  <p>
                    <strong>Future of AI – Tech Conference</strong>
                  </p>
                  <h6>• Date: December 3, 2024</h6>
                  <h6>
                    • Location: Oman Convention & Exhibition Centre, Muscat
                  </h6>
                  <hr />
                </div>
                <div>
                  <p>
                    <strong>Winter Wonderland – Family Festival</strong>
                  </p>
                  <h6>• Date: December 20, 2024</h6>
                  <h6>• Location: Qurum Park, Muscat</h6>
                </div>
              </CardBody>
            </Col>
          </Row>
        </Card>
      </div>

      <Row className="custom-row">
        <Col className="custom-col">
          <Link to="/AdminLogin" className="custom-link">
            <button className="custom-button mx-5 ">Admin</button>
          </Link>
          <Link to="/AboutUs" className="custom-link">
            <button className="custom-button-about mx-5 ">About Us</button>
          </Link>

          <Link to="/UserLogin" className="custom-link">
            <button className="custom-button-login mx-5 ">Login</button>
          </Link>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="custom-card-border">
            <CardBody className="custom-card-body">
              <h2 className="custom-heading">Project Overview</h2>
              <p className="custom-paragraph">
                <b>The Event Booking System</b> is a comprehensive full-stack
                web application aimed at simplifying the process of discovering
                and booking events for users, while offering advanced management
                tools for administrators. The platform connects event organizers
                and attendees, enabling a seamless experience for discovering,
                viewing, and purchasing tickets for various events online.
                <br />
                <br />
                The system supports a wide variety of events—whether concerts,
                conferences, sports events, or local festivals—helping users
                easily navigate through options with personalized
                recommendations based on interests and location. Event
                organizers can create and manage events, track ticket sales, and
                interact with attendees, ensuring smooth operations from
                planning to execution.
                <br />
                <br />
                Users enjoy a simple and efficient interface to explore and book
                events. The platform allows filtering events by date, location,
                category, and price, ensuring attendees find events tailored to
                their preferences. Additionally, users can set reminders for
                events and share bookings with others via social media.
                <br />
                <br />
                Built with modern technologies like React, Node.js, and MongoDB,
                the system is fast, scalable, and responsive. Security is a top
                priority, with robust safeguards for personal and payment
                information. Administrators have full control over platform
                operations through an intuitive dashboard that manages users,
                events, payments, and analytics.
                <br />
                <br />
                Designed for both event-goers and organizers, the system is
                adaptable to all event sizes—from small community gatherings to
                large international conferences. Future developments include
                mobile app integration, real-time event updates, and AI-driven
                event recommendations to further enhance the user experience.
              </p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
