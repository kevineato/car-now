import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import React from 'react'
import VehicleCard from '../components/VehicleCard'

class Browse extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      listings: props.listings,
    }
  }

  static async getInitialProps() {
    const res = await fetch('http://localhost:3000/static/data.json')
    const data = await res.json()

    return {
      listings: data.listings
    }
  }

  render() {
    return (
      <Container>
        {this.props.listings.map((listing) => (
          <Row>
            <Col xs className="my-3">
              <VehicleCard listing={listing} key={listing.id.toString()} />
            </Col>
          </Row>
        ))}
      </Container>
    )
  }
}

export default Browse

