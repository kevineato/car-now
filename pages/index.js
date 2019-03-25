import Carousel from 'react-bootstrap/Carousel'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/CNLayout'

export default function Index(props) {
  return (
    <Layout navActive="home">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={props.listings[0].img_url}
          />
          <Carousel.Caption>
            <h3>{`${props.listings[0].year} ${props.listings[0].make} ${props.listings[0].model}`}</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={props.listings[1].img_url}
          />
          <Carousel.Caption>
            <h3>{`${props.listings[1].year} ${props.listings[1].make} ${props.listings[1].model}`}</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={props.listings[2].img_url}
          />
          <Carousel.Caption>
            <h3>{`${props.listings[2].year} ${props.listings[2].make} ${props.listings[2].model}`}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Layout>
  )
}

Index.getInitialProps = async function() {
  const res = await fetch('http://localhost:3000/static/data.json')
  const data = await res.json()

  console.log(data)

  return {
    listings: data.listings
  }
}
