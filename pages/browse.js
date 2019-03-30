import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import fetch from 'isomorphic-unfetch'
import FilterSort from '../components/FilterSort'
import Row from 'react-bootstrap/Row'
import React from 'react'
import VehicleCard from '../components/VehicleCard'

class Browse extends React.Component {
  constructor(props) {
    super(props)

    this.handleYearChecked = this.handleYearChecked.bind(this)
    this.handleMakeChecked = this.handleMakeChecked.bind(this)
    this.handleModelChecked = this.handleModelChecked.bind(this)

    this.state = {
      filterIds: [],
      filterYears: [],
      filterModels: [],
      filterMakes: [],
      filterText: ""
    }
  }

  getMakeModels(makes) {
    let makeModels = {}
    makes.forEach((make) => {
      this.props.listings.forEach((listing) => {
        if (listing.make === make) {
          if (make in makeModels === false) {
            makeModels[make] = [listing.model]
          } else if (makeModels[make].includes(listing.model) === false) {
            makeModels[make].push(listing.model)
          }
        }
      })
    })

    Object.keys(makeModels).forEach((make) => {
      makeModels[make] = makeModels[make].sort()
    })

    return makeModels
  }

  handleYearChecked(yearChecked, label) {
    let newFilterIds = []
    this.props.listings.forEach((listing) => {
      if (listing.year === label)
        newFilterIds.push(listing.id)
    })

    if (yearChecked) {
      this.setState((prevState, props) => ({
        filterYears: [...prevState.filterYears, label],
        filterIds: prevState.filterIds.concat(newFilterIds)
      }))
    } else {
      this.setState((prevState, props) => ({
        filterYears: prevState.filterYears.filter(year => year !== label),
        filterIds: prevState.filterIds.filter(id => newFilterIds.includes(id) === false)
      }))
    }
  }

  handleMakeChecked(makeChecked, label) {
    let newFilterIds = []
    this.props.listings.forEach((listing) => {
      if (listing.make === label)
        newFilterIds.push(listing.id)
    })

    if (makeChecked) {
      this.setState((prevState, props) => ({
        filterMakes: [...prevState.filterMakes, label],
        filterIds: prevState.filterIds.concat(newFilterIds)
      }))
    } else {
      this.setState((prevState, props) => ({
        filterMakes: prevState.filterMakes.filter(make => make !== label),
        filterIds: prevState.filterIds.filter(id => newFilterIds.includes(id) === false)
      }))
    }
  }

  handleModelChecked(modelChecked, label) {
    let newFilterIds = []
    let oldFilterMakes = []
    let make = ""
    this.props.listings.forEach((listing) => {
      if (listing.model === label) {
        newFilterIds.push(listing.id)
        if (make.length === 0)
          make = listing.make
      }

      if (listing.make === make)
        oldFilterMakes.push(listing.id)
    })

    if (modelChecked) {
      this.setState((prevState, props) => {
        let newFilterState = prevState.filterIds.filter((id) => oldFilterMakes.includes(id) === false)
        return {
          filterModels: [...prevState.filterModels, label],
          filterIds: newFilterState.concat(newFilterIds)
        }
      })
    } else {
      this.setState((prevState, props) => ({
        filterModels: prevState.filterModels.filter(model => model !== label),
        filterIds: prevState.filterIds.filter(id => newFilterIds.includes(id) === false)
      }))
    }
  }

  static async getInitialProps() {
    const res = await fetch('http://localhost:3000/static/data.json')
    const data = await res.json()
    const years = [...new Set(data.listings.map(listing => listing.year))].sort()
    const makes = [...new Set(data.listings.map(listing => listing.make))].sort()
    const models = [...new Set(data.listings.map(listing => listing.model))].sort()

    return {
      listings: data.listings,
      years: years,
      makes: makes,
      models: models
    }
  }

  render() {
    const makeModels = this.getMakeModels(this.props.makes)

    return (
      <Container fluid={true}>
        <Row>
          <Col xl={2}>
            <FilterSort
              years={this.props.years}
              yearsChecked={this.state.filterYears}
              makesChecked={this.state.filterMakes}
              modelsChecked={this.state.filterModels}
              onYearCheckedChange={this.handleYearChecked}
              onMakeCheckedChange={this.handleMakeChecked}
              onModelCheckedChange={this.handleModelChecked}
              makeModels={makeModels}
              />
          </Col>
          <Col xl={10}>
            <Container fluid={true}>
              <Row>
                {this.props.listings.map((listing) => {
                  if (this.state.filterIds.length === 0 || this.state.filterIds.includes(listing.id))
                  return (
                    <Col xl={6}>
                      <VehicleCard listing={listing} key={listing.id.toString()} />
                    </Col>
                  )
                })}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Browse

