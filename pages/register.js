import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import React from 'react'
import { withRouter } from 'next/router'

class Register extends React.Component {
  constructor(props) {
    super(props)

    this.state = { validated: false }
  }

  handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()
    const form = e.currentTarget
    form.elements["formGridConfirmPassword"].setCustomValidity("")
    if (form.checkValidity() === false || (!(form.elements["formGridPassword"].value === form.elements["formGridConfirmPassword"].value))) {
      if (!(form.elements["formGridPassword"].value === form.elements["formGridConfirmPassword"].value))
        form.elements["formGridConfirmPassword"].setCustomValidity("Confirm password does not match.")
    } else {
      this.setState({validated: true})
      alert(`Thanks for registering. You are now signed in ${form.elements["formGridName"].value}!`)
      sessionStorage.setItem("loggedIn", "true")
      sessionStorage.setItem("name", form.elements["formGridName"].value)
      sessionStorage.setItem("email", form.elements["formGridEmail"].value)
      sessionStorage.setItem("password", form.elements["formGridPassword"].value)
      sessionStorage.setItem("address1", form.elements["formGridAddress1"].value)
      sessionStorage.setItem("address2", form.elements["formGridAddress2"].value)
      sessionStorage.setItem("city", form.elements["formGridCity"].value)
      sessionStorage.setItem("state", form.elements["formGridState"].value)
      sessionStorage.setItem("zip", form.elements["formGridZip"].value)
      location.replace("http://localhost:3000")
    }
    form.classList.add('was-validated')
  }


  render() {
    return (
      <Container className="mt-5">
        <h1 className="h3 mb-3 font-weight-normal">Registration</h1>
        <h3 className="h6 text-danger mb-3 font-weight-normal">NOTE: DO NOT USE REAL LOGIN INFORMATION!!!</h3>
        <Form method="post" noValidate validated={this.state.validated} className="needs-validation" onSubmit={e => this.handleSubmit(e)}>
          <Form.Group controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
          <Form.Control required type="email" name="email" placeholder="Email address" />
          <div className="invalid-feedback">
            Please enter a valid email.
          </div>
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" name="password" placeholder="Password" />
              <div className="invalid-feedback">
                Please enter a valid password.
              </div>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control required type="password" name="confirmPass" placeholder="Confirm Password" />
              <div className="invalid-feedback">
                Confirm password does not match.
              </div>
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control name="name" required placeholder="Full Name" />
            <div className="invalid-feedback">
              Please enter your full name.
            </div>
          </Form.Group>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control required name="address1" placeholder="1234 Main St" />
            <div className="invalid-feedback">
              Please enter a valid address.
            </div>
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control name="address2" placeholder="Apartment, studio, or floor" />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control required name="city" />
              <div className="invalid-feedback">
                Please enter a valid city.
              </div>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control required name="state" />
              <div className="invalid-feedback">
                Please enter a valid state.
              </div>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control required name="zip" />
              <div className="invalid-feedback">
                Please enter a valid zip code.
              </div>
            </Form.Group>
          </Form.Row>

          <Button variant="success" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    )
  }
}

export default withRouter(Register)
