import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import React from 'react'

class Browse extends React.Component {
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
            <Col xs className="my-2">
              <Card>
                <Card.Img variant="top" src={listing.img_url} />
                <Card.Body>
                  <Card.Title>
                    {`${listing.year} ${listing.make} ${listing.model}`}
                  </Card.Title>
                  <Card.Text>
                    {`${listing.price}`}
                  </Card.Text>
                  <Button variant="primary">
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      </Container>
    )
  }
}

export default Browse

