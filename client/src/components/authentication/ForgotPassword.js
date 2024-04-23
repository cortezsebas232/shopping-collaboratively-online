import React, { useState } from "react"
import { Form, Button, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext.js"
import { Link } from "react-router-dom"
import '../../css/UpdateProfile.css';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const { resetPassword } = useAuth();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
        setMessage("");
        setError("");
        setLoading(true);
        await resetPassword(email);
            setMessage("Check your inbox for further instructions");
        } catch {
            setError("Failed to reset password");
        }

        setLoading(false);
    }

    return (
        <div>
            <div className="main-card">
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit} className="profile-form">
                        <h2 className="text-center mb-4" style={{color:"#fff"}}>Password Reset</h2>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" variant="flat" type="submit">
                        Reset Password
                        </Button>
                    </Form>
            </div>
            <div className="w-100 text-center mt-3">
                Already have an account? <Link to="/login">Login</Link>
            </div>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/register">Sign Up</Link>
            </div>
        </div>
    )
}