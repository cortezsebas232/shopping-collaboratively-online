import React, { useEffect, useRef, useState } from "react"
import { Form, Button, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Header from '../social/Header.js';
import '../../css/UpdateProfile.css';
import db from "../../firebase";

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const nameRef = useRef()
  const { currentUser, updatePassword, updateEmail, updateDisplayName } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [requests, setRequests] = useState(0);
  const [length, setLength] = useState(0);

  useEffect(() => {
      if (currentUser) {
          db.collection("users").doc(currentUser.uid).get().then(docc => {
              const data = docc.data();
              setLength(data.noItems);
          })
          db.collection("users").doc(currentUser.uid).collection("friendRequests").get().then(snapshot => {
            setRequests(snapshot.size);
          })
      }
  })

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (nameRef.current.value !== currentUser.displayName) {
        promises.push(updateDisplayName(nameRef.current.value))
    }
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/dashboard")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div>
    <Header length={length} noRequests={requests} />
      <div className="main-card">
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit} class="profile-form">
          <h2 className="text-center mb-4 font-weight-bold" style={{color:"#fff"}}>Update Profile</h2>
            <Form onSubmit={handleSubmit}>
            <Form.Group id="display-name">
                <Form.Label>Display Name</Form.Label>
                <Form.Control
                  type="name"
                  ref={nameRef}
                  required
                  defaultValue={currentUser.displayName}
                />
              </Form.Group>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                  defaultValue={currentUser.email}
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  placeholder="Leave blank to keep the same"
                />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  placeholder="Leave blank to keep the same"
                />
              </Form.Group>
              <Button disabled={loading} onClick={handleSubmit} className="w-100" variant="flat" type="submit">
                Update
              </Button>
            </Form>
        </Form>
      </div>
      {/* <div className="w-100 text-center mt-2">

        <Link to="/">Cancel</Link>
      </div> */}
      <div className="w-100 text-center mt-2">
      <Link to="/dashboard">
        <Button className="w-10" variant="outline-danger" style={{marginLeft:30}}>
                  Cancel
        </Button>
      </Link>
      </div>
    </div>
  )
}