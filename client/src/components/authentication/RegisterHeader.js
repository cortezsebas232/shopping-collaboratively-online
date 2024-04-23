import React, { useState } from 'react'
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../css/RegisterHeader.css';
import logo from '../../resources/logo_Famista.png';
import bg from '../../resources/RegisterBackground.png';
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from 'react-router-dom';

function RegisterHeader() {
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
        <div>
            <img src={bg} className="header__bg" alt="background"></img>
            <div className="register__header">
            <Container fluid>
                <Row>
                    <Col xs={12} md={6} className="header__left">
                        <center>
                            <Link to="/">
                                <img src={logo} alt="FAMista Logo" className="header__logo"></img>
                            </Link>
                        </center>
                    </Col>
                    <Col xs={12} md={6} className="d-none d-md-block header__right">
                        <p className="header__text">Already signed up? Log in</p>
                        <form>
                            <input onChange={(e) => setEmail(e.target.value)} className="header__input1" type="email" placeholder="Email Address" />
                            <input onChange={(e) => setPassword(e.target.value)} className="header__input2" type="password" placeholder="Password" />
                            <button disabled={loading} type="submit" onClick={handleSubmit} className="header__submit">Log In</button>
                        </form>
                        <center>
                        {error && <Alert className="w-75 text-center mt-3" variant="danger">{error}</Alert>}
                        </center>
                    </Col>
                </Row>
                </Container>
            </div>
        </div>
    )
}

export default RegisterHeader
