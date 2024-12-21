import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row, Card, CardBody } from 'reactstrap';
import Logo from '../Images/Logo.png';

const AboutUs = () => {
    let borderStyle = {
        color: "#3A5B22",
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: '#3A5B22'
    };
    const styles = {
        backButton: {
            fontSize: '25px',
            color: '#3A5B22',
            textDecoration: 'none',
            fontWeight: 'bold',
            position: 'fixed',
            top: '10px',
            left: '10px',
            zIndex: 1000, // Ensures it stays on top of other content
        },
        arrow: {
            marginRight: '5px',
        }
    };

    return (
        <Container fluid className="bg-light p-5" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                <Link to="/" style={styles.backButton}>
                    <span style={styles.arrow}>&#8592;</span> Back to Home
                </Link>
            <Row className="mb-5">
                <Col md={6} className="d-flex justify-content-center">
                    <img src={Logo} alt="Our Team"  />
                </Col>
                <Col md={6}>
                    <Card className="p-4" style={borderStyle}>
                        <CardBody>
                            <h1>Who We Are:</h1>
                            <p style={{ color: 'black', textAlign: 'justify' }}>
                                We are EventHub, a dedicated platform built to make discovering and booking events
                                easier and more enjoyable. Our team is passionate about connecting people with
                                unforgettable experiences and bringing diverse events to your fingertips. We aim
                                to create an accessible, user-friendly platform that caters to everyone, from
                                casual event-goers to passionate enthusiasts.
                            </p>
                        </CardBody>
                    </Card>
                </Col>
            </Row>


            <Row className="mb-5">
                <Col md={6}>
                    <Card className="p-4" style={borderStyle}>
                        <CardBody>
                            <h2>What We Strive to Achieve:</h2>
                            <p style={{ color: 'black', textAlign: 'justify' }}>
                                At EventHub, our mission is simple: to simplify the event booking process,
                                making it as smooth and enjoyable as possible. We believe everyone deserves
                                access to memorable experiences, and we strive to make that happen by creating
                                a reliable and secure platform. We continuously improve our features, from
                                personalized recommendations to efficient booking, to enhance the user experience.
                                
                            </p>
                            <br/>
                        </CardBody>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="p-4" style={borderStyle}>
                        <CardBody>
                            <h2>How We See Our Future:</h2>
                            <p style={{ color: 'black', textAlign: 'justify' }}>
                                Looking ahead, we envision EventHub becoming a leading event booking platform,
                                renowned for its convenience, reliability, and extensive event offerings.
                                We plan to expand our event categories, add exclusive partnerships, and
                                introduce more features that elevate user engagement and satisfaction. As we
                                grow, we’re committed to maintaining a high standard of quality, constantly
                                adapting to meet our users' needs and providing even more exciting ways to
                                discover and enjoy events.
                            </p>
                        </CardBody>
                    </Card>
                </Col>
            </Row>


            <Row  className="mb-5">
                <Col>
                    <Card className="p-5" style={borderStyle}>
                        <CardBody>
                            <h1 className="text-center mb-4" style={{ color: '#3A5B22' }}>Meet the Development Team:</h1>
                            <p style={{ color: 'black', textAlign: 'justify' }}>
                                The EventHub platform was built by a dedicated team of developers, each contributing unique
                                skills and expertise to create a seamless and user-friendly experience. Below, you’ll find
                                information about our team members and their roles in bringing this project to life.
                                
                            </p>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            {/* Team Members */}
            <Row className="mb-7">
                <Col md={4}>
                    <Card className="p-5" style={borderStyle}>
                        <CardBody>
                            <h4>Talal Al Aidarus</h4>
                            <p>Role(s): Front-End Developer, Server-Side Developer, Database Designer, Project Manager</p>
                            <p>ID: 16S1914</p>
                            <p>Email: 16S19144@utas.edu.om</p>
                            <p>Talal led the project management and handled both front-end and back-end development, as well as database design, ensuring a consistent and well-integrated platform.</p>
                        </CardBody>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="p-5" style={borderStyle}>
                        <CardBody>
                            <h4>Nasser Mohamed Al-Habsi</h4>
                            <p>Role(s): Front-End Developer, Server-Side Developer</p>
                            <br/>
                            <p>ID: 16s20116</p>
                            <p>Email: 16s20116@utas.edu.om</p>
                            <p>Nasser contributed to both the front-end user experience and server-side functionality, implementing features that enhance user interaction and data flow.</p>
                        </CardBody>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="p-5" style={borderStyle}>
                        <CardBody>
                            <h4>Al Aiham Ahmed Al-Rahbi</h4>
                            <p>Role(s): Front-End Developer, Server-Side Developer</p>
                            <br/>
                            <p>ID: 16j19184</p>
                            <p>Email: 16j19184@utas.edu.om</p>
                            <p>Al Aiham assisted in designing and coding the front-end, as well as ensuring the server-side runs smoothly, focusing on performance and security.</p>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
};

export default AboutUs;
