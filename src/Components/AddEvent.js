import { React, useState } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  input,
  Card,
  CardBody,
  Form,
  FormGroup,
} from "reactstrap";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { insertEvent } from "../Features/EventSlice";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { EventValidations } from "../Validations/EventValidations";

const AddEvent = () => {
  let borderStyle = {
    color: "#3A5B22",
    borderStyle: "solid",
    borderWidth: "2px",
    borderColor: "#3A5B22",
  };

  let navigate = useNavigate();

  const locationOptions = [
    "Al Amerat",
    "Al Ghubrah",
    "Al Hail",
    "Al Khuwair",
    "Al Mawaleh",
    "Al Seeb",
    "Azaiba",
    "Bawshar",
    "Ghala",
    "Mabela",
    "Madinat Al Ilam",
    "Muttrah",
    "Qurum",
    "Ruwi",
    "Seeb",
    "Shatti Al Qurum",
    "Sultan Qaboos Street",
  ];

  const EventTypeOptions = [
    "Concerts",
    "Festivals",
    "Workshops",
    "Conferences",
    "Exhibitions",
    "Sports Events",
    "Theater Performances",
  ];

  const EventStatusOptions = [
    "Upcoming",
    "In Progress",
    "Completed",
    "Postponed",
    "Cancelled",
  ];

  const dispatch = useDispatch();
  const msg = useSelector((state) => state.Eventcount.message);

  const {
    register,
    handleSubmit: submitForm,
    formState: { errors },
  } = useForm({ resolver: yupResolver(EventValidations) });

  const handleSubmit = (data) => {
    dispatch(insertEvent(data));
  };

  return (
    <Container>
      <Row>
        <Col md="1">
          <button className="backBtnA" onClick={() => navigate("/AdminHome")}>
            Back
          </button>
        </Col>
      </Row>
      <Row>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "100px",
          }}
        >
          <Card
            className="AddEventCard"
            style={{ ...borderStyle, width: "80%", padding: "5%" }}
          >
            <Row>
              <h1 className="mb-3">Add Event:</h1>
              <h5>{msg}</h5>
            </Row>
            <Row>
              <Col md={6} style={{ borderRight: "1px solid #3A5B22" }}>
                <CardBody>
                  <form onSubmit={submitForm(handleSubmit)}>
                    <FormGroup>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Event Name"
                        {...register("name")}
                        // value={name}
                      />
                      <p className="error">{errors.name?.message}</p>
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="date"
                        placeholder="Event Date and Time"
                        className="form-control"
                        {...register("date", {
                          setValueAs: (value) => value ? new Date(value).toISOString().split("T")[0] : "",
                        })}
                        // value={date}
                      />
                      <p className="error">{errors.date?.message}</p>
                    </FormGroup>
                    <FormGroup>
                      <select
                        id="location"
                        className="form-control"
                        {...register("location")}
                      >
                        <option value="">Select Location</option>
                        {locationOptions.map((location, index) => (
                          <option key={index} value={location}>
                            {location}
                          </option>
                        ))}
                      </select>
                      <p className="error">{errors.location?.message}</p>
                    </FormGroup>
                    <FormGroup>
                      <select
                        id="Type"
                        className="form-control"
                        {...register("type")}
                      >
                        <option value="">Select type</option>
                        {EventTypeOptions.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <p className="error">{errors.type?.message}</p>
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="number"
                        placeholder="Ticket Price"
                        className="form-control"
                        {...register("price")}
                        // value={price}
                      />
                      <p className="error">{errors.price?.message}</p>
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="number"
                        placeholder="Available Tickets"
                        className="form-control"
                        {...register("tickets")}
                        // value={tickets}
                      />
                      <p className="error">{errors.tickets?.message}</p>
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="text"
                        placeholder="Organizer Information"
                        className="form-control"
                        {...register("organizer")}
                        // value={organizer}
                      />
                      <p className="error">{errors.organizer?.message}</p>
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="number"
                        placeholder="Contact Information"
                        className="form-control"
                        {...register("contact")}
                        // value={contact}
                      />
                      <p className="error">{errors.contact?.message}</p>
                    </FormGroup>
                    <FormGroup>
                      <select
                        id="Status"
                        className="form-control"
                        {...register("status")}
                      >
                        <option value="">Select type</option>
                        {EventStatusOptions.map((Status, index) => (
                          <option key={index} value={Status}>
                            {Status}
                          </option>
                        ))}
                      </select>
                      <p className="error">{errors.status?.message}</p>
                    </FormGroup>
                  </form>
                </CardBody>
              </Col>

              <Col md={6}>
                <CardBody>
                  <form onSubmit={submitForm(handleSubmit)}>
                    <FormGroup>
                      <textarea
                        placeholder="Event Description"
                        className="inputareaD form-control"
                        {...register("description")}
                        // value={description}
                      />
                      <p className="error">{errors.description?.message}</p>
                    </FormGroup>
                    <FormGroup>
                      <textarea
                        placeholder="Event Schedule"
                        className="inputarea form-control"
                        {...register("schedule")}
                        // value={schedule}
                      />
                      <p className="error">{errors.schedule?.message}</p>
                    </FormGroup>
                    <FormGroup>
                      <textarea
                        placeholder="Additional Notes (Optional)"
                        className="inputarea form-control"
                        {...register("notes")}
                        // value={notes}
                      />
                      <p className="error">{errors.notes?.message}</p>
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="text"
                        id="profilePicURL"
                        className="form-control"
                        placeholder="Image Link.."
                        {...register("image")}
                        // value={image}
                      />
                      <p className="error">{errors.image?.message}</p>
                    </FormGroup>
                    <FormGroup>
                      <Button
                        color="primary"
                        className="postbutton"
                        type="submit"
                      >
                        Add
                      </Button>
                    </FormGroup>
                  </form>
                </CardBody>
              </Col>
            </Row>
          </Card>
        </div>
      </Row>
    </Container>
  );
};

export default AddEvent;
