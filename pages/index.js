import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import fetch from 'isomorphic-unfetch'

export default function Index(props) {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <Carousel>
            <Carousel.Item>
              <a href={props.listings[0].img_url}>
                <img
                  className="w-100"
                  src={props.listings[0].img_url}
                />
              </a>
              <Carousel.Caption>
                <h3>{`${props.listings[0].year} ${props.listings[0].make} ${props.listings[0].model}`}</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <a href={props.listings[1].img_url}>
                <img
                  className="w-100"
                  src={props.listings[1].img_url}
                />
              </a>
              <Carousel.Caption>
                <h3>{`${props.listings[1].year} ${props.listings[1].make} ${props.listings[1].model}`}</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <a href={props.listings[2].img_url}>
                <img
                  className="w-100"
                  src={props.listings[2].img_url}
                />
              </a>
              <Carousel.Caption>
                <h3>{`${props.listings[2].year} ${props.listings[2].make} ${props.listings[2].model}`}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  )
}

Index.getInitialProps = async function() {
  const res = await fetch('http://localhost:3000/static/data.json')
  const data = await res.json()

  return {
    listings: data.listings
  }
}
