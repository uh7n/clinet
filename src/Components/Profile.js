import React, { useState } from "react";
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword, updateUserName } from "../Features/UserSlice";

const Profile = () => {
    const Uname = useSelector((state) => state.counter.user.name);
    const email = useSelector((state) => state.counter.user.email);
    const image = useSelector((state) => state.counter.user.image);

    const dispatch = useDispatch();

    const [name, setName] = useState(Uname); // Editable name field
    const [isResettingPassword, setIsResettingPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSaveChanges = async () => {
        if (name !== Uname) {
            try {
                const response = await dispatch(updateUserName({ email, newName: name }));
    
                console.log("Update response:", response);
    
                if (response.meta?.requestStatus === "fulfilled") {
                    alert(response.payload.message || "Profile updated successfully!");
                } else {
                    console.error("Error:", response.payload || response.error.message);
                    alert(response.payload || "Failed to update profile. Please try again.");
                }
            } catch (error) {
                console.error("Unexpected error:", error);
                alert("An unexpected error occurred. Please try again.");
            }
        } else {
            alert("No changes to save.");
        }
    };
    
    
    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
    
        try {
            console.log("Payload for resetPassword:", { email, currentPassword, newPassword });
    
            const response = await dispatch(
                resetPassword({ email, currentPassword, newPassword })
            );
    
            console.log("Reset password response:", response); // Debugging log
    
            if (response.meta?.requestStatus === "fulfilled") {
                alert(response.payload.message || "Password reset successfully!");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setIsResettingPassword(false);
            } else {
                console.error("Error:", response.payload || response.error.message);
                alert(response.payload || "Failed to reset password. Please try again.");
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            alert("An unexpected error occurred while resetting the password.");
        }
    };
    

    return (
        <Container className="mt-5">
            <Row>
                <Col md="4">
                    <div className="text-center mb-4">
                        <img
                            src={image}
                            alt="Profile"
                            className="img-fluid rounded-circle"
                            style={{ width: "150px", height: "150px" }}
                        />
                    </div>

                    <Form>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                disabled
                                placeholder="Enter your email"
                            />
                        </FormGroup>

                        <Button color="primary" className="w-100 mb-2" onClick={handleSaveChanges}>
                            Save Changes
                        </Button>

                        {!isResettingPassword ? (
                            <Button
                                color="warning"
                                className="w-100 mb-2"
                                onClick={() => setIsResettingPassword(true)}
                            >
                                Reset Password
                            </Button>
                        ) : (
                            <>
                                <FormGroup>
                                    <Label for="currentPassword">Current Password</Label>
                                    <Input
                                        type="password"
                                        name="currentPassword"
                                        id="currentPassword"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        placeholder="Enter your current password"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="newPassword">New Password</Label>
                                    <Input
                                        type="password"
                                        name="newPassword"
                                        id="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Enter your new password"
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="confirmPassword">Confirm Password</Label>
                                    <Input
                                        type="password"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm your new password"
                                    />
                                </FormGroup>

                                <Button
                                    color="success"
                                    className="w-100 mb-2"
                                    onClick={handleResetPassword}
                                >
                                    Submit New Password
                                </Button>

                                <Button
                                    color="secondary"
                                    className="w-100"
                                    onClick={() => setIsResettingPassword(false)}
                                >
                                    Cancel
                                </Button>
                            </>
                        )}

                        <Button color="danger" className="w-100">
                            Logout
                        </Button>
                    </Form>
                </Col>

                <Col md="8">
                    <Row>
                        <Col md="12" className="mb-4">
                            <h3>Upcoming Events</h3>
                            <ul>
                                <li>Event 1 - Date</li>
                                <li>Event 2 - Date</li>
                                <li>Event 3 - Date</li>
                            </ul>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <h3>Past Events</h3>
                            <ul>
                                <li>Event A - Date</li>
                                <li>Event B - Date</li>
                                <li>Event C - Date</li>
                            </ul>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
