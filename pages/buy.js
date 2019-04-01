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
    this.displayAlert = this.displayAlert.bind(this)
  }

  displayAlert(e) {
    e.preventDefault()
  }

  render() {
    const listing = JSON.parse(this.props.router.query.listing)

    return (
      <Container>
        <VehicleCard listing={listing} />
        <Form onSubmit={this.displayAlert}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Full Name</Form.Label>
              <Form.Control placeholder="Full Name" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="1234 Main St" />
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
          <Form.Control placeholder="Apartment, studio, or floor" />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} xs={10} controlId="formGridCardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group as={Col} xs={2} controlId="formGridSecurityCode">
              <Form.Label>Security Code</Form.Label>
              <Form.Control />
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
