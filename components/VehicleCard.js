import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Link from 'next/link'
import ListGroup from 'react-bootstrap/ListGroup'
import React from 'react'
import Row from 'react-bootstrap/Row'

class VehicleCard extends React.Component {
  render() {
    let buy = false
    if (this.props.buy)
      buy = true

    const listing = this.props.listing
    const firstDetailCol = {
      "miles": "Miles",
      "city_mpg": "City MPG",
      "hwy_mpg": "Highway MPG",
      "body_style": "Body Style",
      "trim": "Trim",
      "cab": "Cab",
      "transmission": "Transmission"
    }
    const secondDetailCol = {
      "exterior_color": "Ext. Color",
      "interior_color": "Int. Color",
      "doors": "Doors",
      "capacity": "Capacity",
      "bed_length": "Bed Length",
      "drive_train": "Drive Train",
      "engine": "Engine"
    }

    return (
      <Card className="my-3" style={{ boxShadow: '7px 5px 20px' }}>
        <Link as={`/v/${listing.id.toString()}`} href={`/vehicle?id=${listing.id.toString()}&listing=${JSON.stringify(listing)}`}>
          <a><Card.Img variant="top" src={listing.img_url} /></a>
        </Link>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            <h1>{`${listing.year} ${listing.make} ${listing.model}`}</h1>
            <h3>{`$${listing.price}`}</h3>
          </Card.Title>
          <Card.Text>
            <span className="text-muted">{listing.miles} miles</span>
          </Card.Text>
          {buy ? <a className="btn btn-primary" href={`/buy/${listing.id}`}>Buy Now</a> : ""}
        </Card.Body>
        <Card.Footer as="a" href={`#collapse${listing.id.toString()}`} data-toggle="collapse" aria-expanded="false" aria-controls={`collapse${listing.id.toString()}`} className="d-flex justify-content-center">
          <i className="fas fa-chevron-circle-down fa-lg"></i>
        </Card.Footer>
        <div className="collapse" id={`collapse${listing.id.toString()}`}>
          <Card.Body>
            <Container fluid={true}>
              <Row>
                <Col lg={6}>
                  <ListGroup variant="flush">
                    {Object.keys(firstDetailCol).map(function (key) {
                      if (key in listing) {
                        return (
                        <ListGroup.Item key={key} className="d-flex justify-content-between">
                          <span className="text-muted">{firstDetailCol[key]}</span>
                          <span>{listing[key]}</span>
                        </ListGroup.Item>
                      )}
                    })}
                  </ListGroup>
                </Col>
                <Col lg={6}>
                  <ListGroup variant="flush">
                    {Object.keys(secondDetailCol).map(function (key) {
                      if (key in listing) {
                        return (
                          <ListGroup.Item key={key} className="d-flex justify-content-between">
                            <span className="text-muted">{secondDetailCol[key]}</span>
                            <span>{listing[key]}</span>
                          </ListGroup.Item>
                        )}
                    })}
                  </ListGroup>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </div>
      </Card>
    )
  }
}

export default VehicleCard
