import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import React from 'react'
import VehicleCard from '../components/VehicleCard'
import { withRouter } from 'next/router'

class Buy extends React.Component {
  constructor(props) {
    super(props)
    this.listing = JSON.parse(props.router.query.listing)

    this.state = { validated: false }
  }

  handleSubmit(e) {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      e.preventDefault()
      e.stopPropagation()
      alert(`You successfully purchased a ${this.listing.year} ${this.listing.make} ${this.listing.model}!`)
      this.setState({validated: true})
    }
    form.classList.add('was-validated')
  }


  render() {
    return (
      <Container>
        <VehicleCard listing={this.listing} />
        <Form noValidate validated={this.state.validated} className="needs-validation" onSubmit={e => this.handleSubmit(e)}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label for="customName">Full Name</Form.Label>
              <Form.Control id="customName" required placeholder="Full Name" />
              <div className="invalid-feedback">
                Please enter your full name.
              </div>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
            <Form.Control required type="email" placeholder="Enter email" />
            <div className="invalid-feedback">
              Please enter a valid email.
            </div>
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control required placeholder="1234 Main St" />
            <div className="invalid-feedback">
              Please enter a valid address.
            </div>
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control placeholder="Apartment, studio, or floor" />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control required />
              <div className="invalid-feedback">
                Please enter a valid city.
              </div>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control required />
              <div className="invalid-feedback">
                Please enter a valid state.
              </div>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control required />
              <div className="invalid-feedback">
                Please enter a valid zip code.
              </div>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} xs={10} controlId="formGridCardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control required />
              <div className="invalid-feedback">
                Please enter a valid credit card number.
              </div>
            </Form.Group>
            <Form.Group as={Col} xs={2} controlId="formGridSecurityCode">
              <Form.Label>Security Code</Form.Label>
              <Form.Control required />
              <div className="invalid-feedback">
                Please enter a security code.
              </div>
            </Form.Group>
          </Form.Row>
          <Button variant="success" type="submit">
            Checkout
          </Button>
        </Form>
      </Container>
    )
  }
}

export default withRouter(Buy)
