import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "../Style/MoreDetails.css";
import { savePost, getPosts } from "../Features/PostSlice";
import { Link } from "react-router-dom";
import { Col, Container, Row, FormGroup, Label, Input } from "reactstrap";
import { FaArrowLeft } from "react-icons/fa";

const MoreDetails = () => {
  const [postMsg, setMsg] = useState("");
  const [rating, setRating] = useState("");
  const [eventDetails, setEventDetails] = useState(null);

  const posts = useSelector((state) => state.posts.posts);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/getEventDetails/${id}`
        );
        setEventDetails(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };
    fetchEventDetails();
  }, [id]);

  if (!eventDetails) {
    return <div>Loading...</div>;
  }

  const handleFeedback = () => {
    if (!postMsg || rating === "0") {
      alert("Please enter feedback and select a valid rating.");
      return;
    }

    const postData = {
      postMsg: postMsg,
      email: "user@example.com", // Replace with actual user email if available
      rating: rating,
    };

    dispatch(savePost(postData));
    setMsg(""); // Clear the feedback input
    setRating("0"); // Reset the rating dropdown
  };

  const {
    name,
    date,
    location,
    price,
    tickets,
    description,
    notes,
    image,
  } = eventDetails;

  return (
    <Container fluid>
      <Row className="more-details">
        {/* Top Section */}
        <Row className="top-section">
          <Col md="1">
            <button className="backBtn" onClick={() => navigate("/EventList")}>
              <FaArrowLeft />
            </button>
          </Col>
          <Col md="11">
            <h1>{name}</h1>
          </Col>
        </Row>

        {/* Main Content */}
        <Row className="my-4">
          {/* Event Details */}
          <Col md="4" className="columns">
            <img className="eventImage" src={image} alt={`${name} event`} />
            <Row className="event-details">
              <FormGroup>
                <Label className="details-Title">Date:</Label>
                <Label className="details-Value">{date}</Label>
              </FormGroup>
              <FormGroup>
                <Label className="details-Title">Location:</Label>
                <Label className="details-Value">{location}</Label>
              </FormGroup>
              <FormGroup>
                <Label className="details-Title">Price:</Label>
                <Label className="details-Value">{`OMR ${price}`}</Label>
              </FormGroup>
              <FormGroup>
                <Label className="details-Title">Tickets Available:</Label>
                <Label className="details-Value">{tickets}</Label>
              </FormGroup>
              <Link to={`/booking/${eventDetails._id}`}>
                <button color="primary" block className="bookBtn">
                  Book Now
                </button>
              </Link>
            </Row>
          </Col>

          {/* Description */}
          <Col md="4" className="columns">
            <Row className="Description">
              <FormGroup>
                <Label className="details-Title">Description:</Label>
                <Label className="details-Value">{description}</Label>
              </FormGroup>
              <FormGroup>
                <Label className="details-Title">Notes:</Label>
                <Label className="details-Value">{notes}</Label>
              </FormGroup>
            </Row>
          </Col>

          {/* Feedback Section */}
          <Col md="3" className="columns-last">
            <Row className="Rating">
              <FormGroup className="w-90">
                <h5>Reviews & Ratings:</h5>

                {/* Feedback Input */}
                <Input
                  type="text"
                  placeholder="Enter Feedback"
                  value={postMsg}
                  onChange={(e) => setMsg(e.target.value)}
                  className="mb-3"
                />

                {/* Rating Dropdown */}
                <Row className="w-90">
                  <Col xs="8">
                    <Input
                      type="select"
                      name="rating"
                      id="rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="0">Select Rating</option>
                      <option value="5">★★★★★</option>
                      <option value="4">★★★★☆</option>
                      <option value="3">★★★☆☆</option>
                      <option value="2">★★☆☆☆</option>
                      <option value="1">★☆☆☆☆</option>
                    </Input>
                  </Col>

                  {/* Submit Button */}
                  <Col xs="4">
                    <button
                      color="primary"
                      block
                      className="submitBtn"
                      onClick={handleFeedback}
                    >
                      Submit
                    </button>
                  </Col>
                </Row>
                <hr />

                {/* Display Feedback Posts */}
                <div className="feedback-container">
                  {posts.map((post, index) => (
                    <div
                      key={index}
                      className="bg-light p-2 m-2 border rounded overflow-auto"
                    >
                      <p>
                        <strong>{post.email}</strong>
                      </p>
                      <p>{post.postMsg}</p>
                      <p>
                        <strong>Rating:</strong> {post.rating}
                      </p>
                    </div>
                  ))}
                </div>
              </FormGroup>
            </Row>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default MoreDetails;
