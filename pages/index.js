import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import fetch from 'isomorphic-unfetch'
import React from 'react'
import Router from 'next/router'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      randIds: [],
      searchText: ""
    }

    this.submitSearch = this.submitSearch.bind(this)
  }

  componentDidMount() {
    let randomIds = []
    if (!sessionStorage.getItem("randomIds")) {
      while (randomIds.length != 3) {
        const id = this.randomInt(0, 49)
        if (!randomIds.includes(id)) {
          randomIds.push(id)
        }
      }

      sessionStorage.setItem("randomIds", randomIds.toString())
    } else {
      randomIds = sessionStorage.getItem("randomIds").split(",")
    }

    this.setState({ randIds: randomIds })
  }

  submitSearch() {
    Router.push(`/search/${this.state.searchText}`)
  }

  static async getInitialProps() {
    const res = await fetch('http://localhost:3000/static/data.json')
    const data = await res.json()

    return {
      listings: data.listings
    }
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  yearMakeModel(id) {
    return `${this.props.listings[id].year} ${this.props.listings[id].make} ${this.props.listings[id].model}`
  }

  render () {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col>
            <Carousel>
              {this.state.randIds.map((id) => (
                <Carousel.Item key={id.toString()}>
                  <a href={`/v/${parseInt(id) + 1}`}>
                    <img
                      className="w-100"
                      src={this.props.listings[id].img_url}
                      alt={this.yearMakeModel(id)}
                    />
                  </a>
                  <Carousel.Caption>
                    <h3>{this.yearMakeModel(id)}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
        <Row className="mt-5 justify-content-center">
          <form onSubmit={() => Router.push(`/browse/${this.state.searchText}`)}>
            <div className="input-group">
              <input type="text" className="form-control" name="searchText" placeholder="Search"
                     aria-label="Search" aria-describedby="search" onChange={(e) => this.setState({ searchText: e.currentTarget.value })} value={this.state.searchText} />
              <div className="input-group-append">
                <button className="btn btn-primary" type="submit" id="search"><i className="fas fa-search"></i></button>
              </div>
            </div>
          </form>
        </Row>
      </Container>
    )
  }
}

export default Index
