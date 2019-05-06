import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { withRouter } from 'next/router'
import React from 'react'

class Vehicle extends React.Component {
  render() {
    const listing = JSON.parse(this.props.router.query.listing)
    const yearMakeModel = `${listing.year} ${listing.make} ${listing.model}`
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
        <Container>
          <Row>
            <Col className="text-center">
              <Image className="my-5" src={listing.img_url} alt={yearMakeModel} rounded fluid />
            </Col>
          </Row>
          <Row noGutters>
            <Col md={6}>
              <ListGroup>
                {Object.keys(firstDetailCol).map(key => {
                  if (key in listing)
                  return (
                    <ListGroup.Item key={key} className="d-flex justify-content-between">
                      <span className="text-muted">{firstDetailCol[key]}</span>
                      <span>{listing[key]}</span>
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
            </Col>
            <Col md={6}>
              <ListGroup>
                {Object.keys(secondDetailCol).map(key => {
                  if (key in listing)
                  return (
                    <ListGroup.Item key={key} className="d-flex justify-content-between">
                      <span className="text-muted">{secondDetailCol[key]}</span>
                      <span>{listing[key]}</span>
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
            </Col>
            <Col>
              <Row className="mt-5 mr-auto mb-5">
                <a className="btn btn-primary ml-auto" href={`/buy/${listing.id}`}>Buy Now</a>
              </Row>
            </Col>
          </Row>
        </Container>
    )
  }
}

export default withRouter(Vehicle)