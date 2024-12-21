import React, { useEffect, useState } from "react"; 
import {
  Col,
  Container,
  Row,
  Card,
  CardBody,
  Button,
  Input,
  Label,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getEvent } from "../Features/EventSlice";

const EventList = () => {
  const Uname = useSelector((state) => state.counter.user.name);
  const image = useSelector((state) => state.counter.user.image);
  const Events = useSelector((state) => state.Eventcount.Event);
  const [events, setEvents] = useState([]); // Original list of events
  const [sortedEvents, setSortedEvents] = useState([]); // Sorted list of events
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // Initial state for sorting order
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category
  const [selectedLocation, setSelectedLocation] = useState(""); // State for selected location
  const difPic = "https://cdn.vectorstock.com/i/500p/97/32/man-silhouette-profile-picture-vector-2139732.jpg";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvent());
  }, [dispatch]);

  // Set events and sort them when Events is fetched
  useEffect(() => {
    if (Events) {
      setEvents(Events); // Store original events
      setSortedEvents(Events); // Initialize sorted events with the original events
    }
  }, [Events]);

  // Handle sorting change
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOrder(value);
    filterAndSortEvents(selectedCategory, selectedLocation, value);
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    filterAndSortEvents(value, selectedLocation, sortOrder);
  };

  // Handle location change
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setSelectedLocation(value);
    filterAndSortEvents(selectedCategory, value, sortOrder);
  };

  // Apply filters and sorting together
  const filterAndSortEvents = (category, location, sort) => {
    let filteredEvents = [...events];

    // Filter by category
    if (category) {
      filteredEvents = filteredEvents.filter((event) => event.type === category);
    }

    // Filter by location
    if (location) {
      filteredEvents = filteredEvents.filter((event) => event.location === location);
    }

    // Filter by search term
    if (searchTerm) {
      filteredEvents = filteredEvents.filter((event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort events
    if (sort === "Ascending") {
      filteredEvents.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "Descending") {
      filteredEvents.sort((a, b) => b.name.localeCompare(a.name));
    }

    setSortedEvents(filteredEvents); // Update sorted events
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSortOrder("");
    setSelectedCategory("");
    setSelectedLocation("");
    setSortedEvents(events); // Reset to the original list of events
  };

  if (!Events) {
    return <h2>Loading Events...</h2>;
  }

  // Define EventTypeOptions
  const EventTypeOptions = [
    "Concerts",
    "Festivals",
    "Workshops",
    "Conferences",
    "Exhibitions",
    "Sports Events",
    "Theater Performances",
  ];

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

  return (
    <Container className="listpage">
      <Row className="div-row">
        <Col className="div-col" md="1"></Col>
        <Col className="div-col" md="10">
          <Row className="div-row">
            <Col className="div-col" md="11">
              <div>
                <h1>Event List for: {Uname}</h1>
              </div>
              <Link to="/">
                <Label>Logout</Label>
              </Link>
            </Col>
            <Col className="div-col" md="1">
              <Link to="/Profile">
                <div className="userPlace">
                  {image ? (
                    <img src={image} className="profilePic" />
                  ) : (
                    <img src={difPic} className="profilePic" />
                  )}
                </div>
              </Link>
            </Col>
          </Row>

          <Row className="div-row">
            <Row className="inner-row">
              <Col className="div-col" md="12">
                <div className="inner-form">
                  <div className="input-field second-wrap">
                    <Input
                      id="search"
                      type="text"
                      placeholder="Search event name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyUp={() => filterAndSortEvents(selectedCategory, selectedLocation, sortOrder)}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Row>

          <Row className="div-row">
            <Col className="div-col" md="3">
              <div className="input-select">
                <select
                  className="choices__input"
                  value={sortOrder}
                  onChange={handleSortChange}
                >
                  <option value="">Sort</option>
                  <option value="Ascending">Ascending order</option>
                  <option value="Descending">Descending order</option>
                </select>
              </div>
            </Col>
            <Col className="div-col" md="3">
              <div className="input-select">
                <select
                  className="choices__input"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">Category</option>
                  {EventTypeOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </Col>
            <Col className="div-col" md="4">
              <div className="input-select">
                <select
                  className="choices__input"
                  value={selectedLocation}
                  onChange={handleLocationChange}
                >
                  <option value="">Location</option>
                  {locationOptions.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </Col>
            <Col className="div-col" md="2">
              <Button color="secondary" onClick={clearFilters}>
                Clear Filters
              </Button>
            </Col>
          </Row>

          <Row className="div-row">
            <div className="line"></div>
          </Row>

          <Row className="div-row">
            <Col className="div-col" md="12">
              <div>
                <h1>List Of Events</h1>
              </div>
            </Col>
          </Row>

          <Row className="div-row">
            {sortedEvents.map((event) => (
              <Col md={4} key={event._id} className="mb-4">
                <div className="major-card">
                  <Row>
                    <Col md="6">
                      <img
                        src={event.image}
                        alt={event.name}
                        className="card-img-top"
                      />
                    </Col>
                    <Col md="6">
                      <h5>{event.name}</h5>
                      <h5>Location: {event.location}</h5>
                      <h5>Type: {event.type}</h5>
                    </Col>
                  </Row>
                  <Row style={{ display: "flex", gap: "10px" }}>
                    <button
                      className="subButtons1"
                      onClick={() => navigate(`/MoreDetails/${event._id}`)}
                    >
                      More
                    </button>
                    <button
                      className="subButtons2"
                      onClick={() => navigate(`/booking/${event._id}`)}
                    >
                      Book Now
                    </button>
                  </Row>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
        <Col className="div-col" md="1"></Col>
      </Row>
    </Container>
  );
};

export default EventList;
