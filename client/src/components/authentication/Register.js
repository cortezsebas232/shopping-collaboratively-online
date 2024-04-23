import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Alert } from 'react-bootstrap';
import '../../css/Register.css';
import design from "../../resources/images.png";
import { useHistory } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import db from '../../firebase';

function Register() {
    const history = useHistory('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const [loading, setLoading] = useState(false);
    const [seed, setSeed] = useState('');    
    
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000)); 
    }, [])

    async function register(event) {
        event.preventDefault();

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        try {
            setError("");
            setLoading(true);
            const auth = await signup(email, password);
            if (auth.user) {
                auth.user.updateProfile({
                    displayName: firstName + " " + lastName,
                    photoURL: `https://avatars.dicebear.com/api/${gender}/${seed}.svg`
                })
                db.collection('users').doc(auth.user.uid).set({
                    name: firstName + " " + lastName,
                    emailAdd: email,
                    phoneNumber: phone,
                    gender: gender,
                    profilePic: `https://avatars.dicebear.com/api/${gender}/${seed}.svg`,
                    subtotal: 0,
                    noItems: 0
                })
                .then((s) => {
                    history.push("/");
                })
            }
          } catch {
            setError("Failed to create an account");
          }
      
          setLoading(false);
    }

    return (
        <div className="register">
            <Container fluid>
            <Row>
                <Col xs={12} md={6} className="register__left">
                    <center>
                    <img src={design} alt="fashion"  className="register__images"></img>
                    </center>
                </Col>
                <Col xs={12} md={6}>
                <center>
                <div className="register__container">
                    <h1>Register Today!</h1>
                    <h3>It's quick and easy..</h3>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <form>
                        <center>
                            <input onChange={(e) => setFirstName(e.target.value)} className="register__name" type="name" placeholder="First Name" />
                            <input onChange={(e) => setLastName(e.target.value)} className="register__name" type="name" placeholder="Last Name" />
                        </center>
                        <center>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                        </center>
                        <center>
                            <input onChange={(e) => setPhoneNumber(e.target.value)} type="tel" placeholder="Mobile Number" />
                        </center>
                        <center>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                        </center>
                        <center>
                            <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" />
                        </center>
                        <h5 className="register__gender">Gender</h5>

                        <div onChange={(e) => setGender(e.target.value)} className="register__radiocontainer">
                            <input type="radio" name="gender" value="male" />
                            <label>male</label>
                            <input type="radio" name="gender" value="female" />
                            <label>female</label>
                            <input type="radio" name="gender" value="other" />
                            <label>other</label>
                        </div>
                        <center>
                        <p className="register__policy">
                            By clicking sign up, you agree to our{" "}
                            <span>Terms, Data Policy</span> and <span>Cookie Policy</span>. You 
                            may recieve SMS notifications from us and can opt out at any time.
                        </p>
                        </center>

                        <center>
                            <button disabled={loading} onClick={register} type="submit" className="register__register">Sign Up</button>
                        </center>
                    </form>
                </div>
                </center>
                </Col>
            </Row>
            </Container>
        </div>
    )
}

export default Register
