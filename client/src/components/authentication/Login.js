import React, { useState } from 'react'
import { Container, Row, Col, Alert } from 'react-bootstrap';
import '../../css/Login.css';
import design from "../../resources/fashion.png";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";

function Login() {
    const [email, setEmail] = useState('');
    const history = useHistory('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
    
        try {
          setError("");
          setLoading(true);
          const auth = await login(email, password);
          console.log(auth);
          history.push("/");
        } catch {
          setError("Failed to log in");
        }
    
        setLoading(false);
    }

    return (
        <div className="login">
            <Container fluid> 
                <Row>
                    <Col xs={12} md={6} className="login__left">
                    <center>
                        <img src={design} alt="fashion"  className="login__images"></img>
                    </center>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="login__container">
                            <h3>Log In To FAMista!</h3>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <form>
                                <center>
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                                </center>
                                <center>
                                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                                </center>
                                <center>
                                    <button disabled={loading} type="submit" onClick={handleSubmit} className="login__login mb-3">Log In</button>
                                </center>
                                <center>
                                    <Link to="/forgot-password"><h6>Forgot Password</h6></Link>
                                </center>
                                <center>
                                    <hr />
                                </center>
                                <center>
                                    <Link to="/register">
                                        <button className="login__createNewAccount">Create New Account</button>
                                    </Link>
                                </center>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login
