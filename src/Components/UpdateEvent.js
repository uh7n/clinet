import React, { useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Card,
  CardBody,
  FormGroup,
} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup"; 
import {updateEvent, getEventById} from '../Features/EventSlice';
import {EventValidations} from '../Validations/EventValidations'

const UpdateEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
 
  console.log("Event ID from URL:", id);
 
  useEffect(() => {
    if (id) {
      dispatch(getEventById(id));
    }
  }, [dispatch, id]);
 
  
  const currentEvent = useSelector((state) => state.Eventcount.currentEvent);
  const isSuccess = useSelector((state) => state.Eventcount.isSuccess);
  const message = useSelector((state) => state.Eventcount.message); 
 
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(EventValidations),
  });
 
  useEffect(() => {
    if (currentEvent) {
      Object.keys(currentEvent).forEach((key) => {
        setValue(key, currentEvent[key] || "");
      });
    }
  }, [currentEvent, setValue]);

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Updated Event Data:", data);
    dispatch(updateEvent({ id, data }));
  };

  
  useEffect(() => {
    if (isSuccess) {
      navigate("/AdminHome");
    }
  }, [isSuccess, navigate]);


  const locationOptions = [
    "Al Amerat", "Al Ghubrah", "Al Hail", "Al Khuwair", "Al Mawaleh",
    "Al Seeb", "Azaiba", "Bawshar", "Ghala", "Mabela", "Madinat Al Ilam",
    "Muttrah", "Qurum", "Ruwi", "Seeb", "Shatti Al Qurum", "Sultan Qaboos Street",
  ];


  const EventTypeOptions = [
    "Concerts", "Festivals", "Workshops", "Conferences", "Exhibitions",
    "Sports Events", "Theater Performances",
  ];

  const EventStatusOptions = [
    "Upcoming", "In Progress", "Completed", "Postponed", "Cancelled",
  ];



  return (
    <Container>
      <Row>
        <Col md="1">
          <button
            className="backBtnA"
            onClick={() => navigate("/AdminHome")}
          >
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
            style={{
              borderStyle: "solid",
              borderWidth: "2px",
              borderColor: "#3A5B22",
              width: "80%",
              padding: "5%",
            }}
          >
            <Row>
              <h1 className="mb-3">Update Event</h1>
              {message && <h5>{message}</h5>}
            </Row>
            <Row>
              <Col md={6} style={{ borderRight: "1px solid #3A5B22" }}>
                <CardBody>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Event Name */}
                    <FormGroup>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Event Name"
                        {...register("name")}
                      />
                      <p className="error">{errors.name?.message}</p>
                    </FormGroup>

                    {/* Event Date */}
                    <FormGroup>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Event Date and Time"
                        {...register("date")}
                      />
                      <p className="error">{errors.date?.message}</p>
                    </FormGroup>

                    {/* Location */}
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

                    {/* Type */}
                    <FormGroup>
                      <select
                        id="Type"
                        className="form-control"
                        {...register("type")}
                      >
                        <option value="">Select Type</option>
                        {EventTypeOptions.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <p className="error">{errors.type?.message}</p>
                    </FormGroup>

                    {/* Price */}
                    <FormGroup>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Ticket Price"
                        {...register("price")}
                      />
                      <p className="error">{errors.price?.message}</p>
                    </FormGroup>

                    {/* Tickets */}
                    <FormGroup>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Available Tickets"
                        {...register("tickets")}
                      />
                      <p className="error">{errors.tickets?.message}</p>
                    </FormGroup>

                    {/* Organizer */}
                    <FormGroup>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Organizer Information"
                        {...register("organizer")}
                      />
                      <p className="error">{errors.organizer?.message}</p>
                    </FormGroup>

                    {/* Contact */}
                    <FormGroup>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Contact Information"
                        {...register("contact")}
                      />
                      <p className="error">{errors.contact?.message}</p>
                    </FormGroup>

                    {/* Status */}
                    <FormGroup>
                      <select
                        id="Status"
                        className="form-control"
                        {...register("status")}
                      >
                        <option value="">Select Status</option>
                        {EventStatusOptions.map((status, index) => (
                          <option key={index} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <p className="error">{errors.status?.message}</p>
                    </FormGroup>

                    <Button type="submit">Update Event</Button>
                  </form>
                </CardBody>
              </Col>

              <Col md={6}>
                <CardBody>
                  {/* Description */}
                  <FormGroup>
                    <textarea
                      className="inputarea form-control"
                      placeholder="Event Description"
                      {...register("description")}
                    />
                    <p className="error">{errors.description?.message}</p>
                  </FormGroup>

                  {/* Schedule */}
                  <FormGroup>
                    <textarea
                      className="inputarea form-control"
                      placeholder="Event Schedule"
                      {...register("schedule")}
                    />
                    <p className="error">{errors.schedule?.message}</p>
                  </FormGroup>

                  {/* Notes */}
                  <FormGroup>
                    <textarea
                      className="inputarea form-control"
                      placeholder="Additional Notes (Optional)"
                      {...register("notes")}
                    />
                    <p className="error">{errors.notes?.message}</p>
                  </FormGroup>

                  {/* Image URL */}
                  <FormGroup>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Image URL"
                      {...register("image")}
                    />
                    <p className="error">{errors.image?.message}</p>
                  </FormGroup>
                </CardBody>
              </Col>
            </Row>
          </Card>
        </div>
      </Row>
    </Container>
  );
};

export default UpdateEvent;
