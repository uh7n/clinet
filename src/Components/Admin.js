import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Row,
  Container,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardText,
  Form,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getEvent, updateEvent, deleteEvent } from "../Features/EventSlice";
import { deleteUser } from "../Features/UserSlice";
import { allUser } from "../Features/UserSlice";

const Admin = () => {
  let borderStyle = {
    color: "black",
    borderStyle: "solid",
    borderWidth: "2px",
    borderColor: "black",
    borderRadius: "10px",
    marginLeft: "15px",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Admin = useSelector((state) => state.administration.Admins);
  const Events = useSelector((state) => state.Eventcount.Event);
  const Users = useSelector((state) => state.counter.user);

  const [EventId, setEventId] = useState("");
  const [EventName, setEventName] = useState("");
  const [UserId, setUserId] = useState("");
  const [modal, setModal] = useState(false);

  const toggle = (msg, id) => {
    setModal(!modal);
    setEventName(msg);
    setEventId(id);
  };

  const handleUpdate = () => {
    const EventData = {
      EventName: EventName,
      EventId: EventId,
    };
    dispatch(updateEvent(EventData));
    dispatch(getEvent());
    toggle();
  };

  const handleDelete = (EventId) => {
    if (window.confirm("Are you sure to delete the Event!!!") == true) {
      dispatch(deleteEvent(EventId)).then(() => {
        dispatch(getEvent());
        window.location.reload(); // Refresh the page
      });
    }
  };

  const handleDeleteUser = (UserId) => {
    if (window.confirm("Are you sure to delete the User!!!") == true) {
      dispatch(deleteUser(UserId)).then(() => {
        dispatch(allUser());
        window.location.reload(); // Refresh the page
      });
    }
  };

  useEffect(() => {
    dispatch(allUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getEvent());
  }, [dispatch]);

  return (
    <Container fluid className="bg-light p-5">
      <Row className="mb-4">
        <Col className="mb-4">
          <Card className="p-4" style={borderStyle}>
            <CardBody>
              <Form>
                <FormGroup>
                  <h2>Administration:</h2>
                </FormGroup>
                <FormGroup className="adminname">
                  <h3>Name: {Admin.name} </h3>
                  <h5>Email: {Admin.email} </h5>
                </FormGroup>
                <FormGroup className="adminname">
                  <h4>Number Of Events: {Events.length}</h4>
                </FormGroup>
                <FormGroup className="adminname">
                  <h4>Number Of Users: {Users.length}</h4>
                </FormGroup>
                <FormGroup className="buttonEvent">
                  <Link to="/AddEvent">
                    <Button
                      color="primary"
                      className="button full-width-button"
                    >
                      Add Event
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button color="danger" className="button full-width-button">
                      Logout
                    </Button>
                  </Link>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>

        {/* Events Section */}
        <Col className="mb-4" style={borderStyle}>
          <FormGroup className="headlist">
            <h2>Events:</h2>
            <div className="line"></div>
          </FormGroup>

          {/* Add scrollable-list class here */}
          <div className="scrollable-list">
            {Events && Events.length > 0 ? (
              Events.map((i) => (
                <Row
                  key={i._id}
                  className="align-items-center mb-3"
                  style={{
                    border: "1px solid green",
                    borderRadius: "5px",
                    padding: "10px",
                    margin: "10px",
                  }}
                >
                  <Col xs="8">
                    <h5>{i.name}</h5>
                  </Col>
                  <Col xs="4" className="text-end">
                    {/* Use d-flex for flexbox layout */}
                    <div className="d-flex justify-content-end gap-2">
                      <Button color="danger" onClick={() => handleDelete(i._id)}>
                        Delete
                      </Button>
                      <Button
                        color="primary"
                        onClick={() => navigate(`/UpdateEvent/${i._id}`)}
                      >
                        Edit
                      </Button>
                    </div>
                  </Col>
                </Row>
              ))
            ) : (
              <p>No events available</p>
            )}
          </div>

          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Update Event:</ModalHeader>
            <ModalBody>
              <Input
                type="text"
                className="form-control"
                value={EventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Enter Event Name"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleUpdate}>
                UPDATE
              </Button>
              <Button color="secondary" onClick={toggle}>
                CANCEL
              </Button>
            </ModalFooter>
          </Modal>
        </Col>

        {/* User Section */}
        <Col className="mb-4" style={borderStyle}>
          <FormGroup className="headlist">
            <h2>Users:</h2>
            <div className="line"></div>
          </FormGroup>
          {Users.map((i) => {
            return (
              <Row
                key={i._id}
                className="align-items-center mb-3"
                style={{
                  border: "1px solid green",
                  borderRadius: "5px",
                  padding: "10px",
                  margin: "10px",
                }}
              >
                <Col xs="8">
                  <h5>{i.email}</h5>
                </Col>
                <Col xs="4" className="text-end">
                  {/* Use d-flex for button alignment */}
                  <div className="d-flex justify-content-end gap-2">
                    <Button
                      color="danger"
                      onClick={() => handleDeleteUser(i._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
