import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, CardBody, CardImg, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useParams } from "react-router-dom";
import "../App.css"; // Make sure your CSS file is correctly imported

const BookingSummary = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState({
    name: "",
    location: "",
    date: "",
    image: "",
    ticketPrice: 0,
    numberOfTickets: 0,
    time: "" // Ensure you have a 'time' field or update accordingly
  });
  const [billingAddress, setBillingAddress] = useState({
    fullName: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    country: ""
  });
  const [paymentInfo, setPaymentInfo] = useState({ cardNumber: "", expiryDate: "", cvv: "" });

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getEventDetails/${eventId}`);
        setEventDetails(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };
    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    console.log("Payment info:", paymentInfo, "Billing address:", billingAddress);
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h1>Booking Confirmation</h1>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="booking-summary">
            <CardBody>
              <h4>Booking Summary:</h4>
              <p><strong>Event Name:</strong> {eventDetails.name}</p>
              <p><strong>Date:</strong> {eventDetails.date}</p>
              <p><strong>Time:</strong> {eventDetails.time}</p>
              <p><strong>Venue:</strong> {eventDetails.location}</p>
              <p><strong>Number of Tickets:</strong> {eventDetails.numberOfTickets}</p>
              <p><strong>Ticket Price:</strong> OMR {eventDetails.ticketPrice}</p>
              <p><strong>Total Price:</strong> OMR {eventDetails.ticketPrice * eventDetails.numberOfTickets}</p>
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <CardImg top src={eventDetails.image} alt="Event Image" />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form onSubmit={handlePaymentSubmit} className="payment-form">
            <h4>Payment Form</h4>
            <FormGroup>
              <Label for="cardName">Name on Card</Label>
              <Input type="text" name="cardName" id="cardName" placeholder="Name on Card" />
            </FormGroup>
            <FormGroup>
              <Label for="cardNumber">Card Number</Label>
              <Input type="text" name="cardNumber" id="cardNumber" placeholder="Card Number" />
            </FormGroup>
            <FormGroup>
              <Label for="expiryDate">Expiration Date</Label>
              <Input type="text" name="expiryDate" id="expiryDate" placeholder="MM/YY" />
            </FormGroup>
            <FormGroup>
              <Label for="cvv">CVV</Label>
              <Input type="text" name="cvv" id="cvv" placeholder="CVV" />
            </FormGroup>
            <Button type="submit" className="btn-pay">Pay</Button>
          </Form>
        </Col>
        <Col md={6}>
          <Form className="billing-form">
            <h4>Billing Address:</h4>
            <Input type="text" placeholder="Full Name" value={billingAddress.fullName} onChange={e => setBillingAddress({...billingAddress, fullName: e.target.value})} />
            <Input type="text" placeholder="Street Address" value={billingAddress.streetAddress} onChange={e => setBillingAddress({...billingAddress, streetAddress: e.target.value})} />
            <Input type="text" placeholder="City" value={billingAddress.city} onChange={e => setBillingAddress({...billingAddress, city: e.target.value})} />
            <Input type="text" placeholder="Postal Code" value={billingAddress.postalCode} onChange={e => setBillingAddress({...billingAddress, postalCode: e.target.value})} />
            <Input type="text" placeholder="Country" value={billingAddress.country} onChange={e => setBillingAddress({...billingAddress, country: e.target.value})} />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingSummary;
