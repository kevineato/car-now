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

    this.handleDirectionChange = this.handleDirectionChange.bind(this)
    this.handleYearChecked = this.handleYearChecked.bind(this)
    this.handleMakeChecked = this.handleMakeChecked.bind(this)
    this.handleModelChecked = this.handleModelChecked.bind(this)
    this.handleSortByChanged = this.handleSortByChanged.bind(this)

    this.state = {
      filterYears: [],
      filterModels: [],
      filterMakes: [],
      sortBy: "price",
      direction: "ascending",
      filterText: ""
    }
  }

  componentWillUnmount() {
    sessionStorage.setItem("filterYears", this.state.filterYears.toString())
    sessionStorage.setItem("filterMakes", this.state.filterMakes.toString())
    sessionStorage.setItem("filterModels", this.state.filterModels.toString())
    sessionStorage.setItem("sortBy", this.state.sortBy)
    sessionStorage.setItem("direction", this.state.direction)
  }

  componentDidMount() {
    let filterYears = []
    let filterMakes = []
    let filterModels = []
    let sortBy = "price"
    let direction = "ascending"
    if (sessionStorage.getItem("filterYears"))
      filterYears = sessionStorage.getItem("filterYears").split(",")
    if (sessionStorage.getItem("filterMakes"))
      filterMakes = sessionStorage.getItem("filterMakes").split(",")
    if (sessionStorage.getItem("filterModels"))
      filterModels = sessionStorage.getItem("filterModels").split(",")
    if (sessionStorage.getItem("sortBy"))
      sortBy = sessionStorage.getItem("sortBy")
    if (sessionStorage.getItem("direction"))
      direction = sessionStorage.getItem("direction")

    this.setState({
      filterYears: filterYears,
      filterMakes: filterMakes,
      filterModels: filterModels,
      sortBy: sortBy,
      direction: direction
    })
  }

  handleDirectionChange(value) {
    this.setState({ direction: value.id })
  }

  handleYearChecked(yearChecked, label) {
    if (yearChecked) {
      this.setState((prevState, props) => ({
        filterYears: [...new Set([...prevState.filterYears, label])]
      }))
    } else {
      this.setState((prevState, props) => ({
        filterYears: [...new Set(prevState.filterYears.filter(year => year !== label))]
      }))
    }
  }

  handleMakeChecked(makeChecked, label) {
    if (makeChecked) {
      this.setState((prevState, props) => ({
        filterMakes: [...new Set([...prevState.filterMakes, label])]
      }))
    } else {
      this.setState((prevState, props) => ({
        filterMakes: [...new Set(prevState.filterMakes.filter(make => make !== label))],
        filterModels: [...new Set(prevState.filterModels.filter(model => this.props.makeModels[label].includes(model) === false))]
      }))
    }
  }

  handleModelChecked(modelChecked, label) {
    if (modelChecked) {
      this.setState((prevState, props) => ({
          filterModels: [...new Set([...prevState.filterModels, label])]
      }))
    } else {
      this.setState((prevState, props) => ({
        filterModels: [...new Set(prevState.filterModels.filter(model => model !== label))]
      }))
    }
  }

  handleSortByChanged(value) {
    this.setState({ sortBy: value.toLowerCase() })
  }

  static async getInitialProps() {
    const res = await fetch('http://localhost:3000/static/data.json')
    const data = await res.json()
    const years = [...new Set(data.listings.map(listing => listing.year))].sort()
    const makes = [...new Set(data.listings.map(listing => listing.make))].sort()
    const models = [...new Set(data.listings.map(listing => listing.model))].sort()

    const makeModels = {}
    makes.forEach((make) => {
      data.listings.forEach((listing) => {
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

    return {
      listings: data.listings,
      years: years,
      makes: makes,
      models: models,
      makeModels: makeModels
    }
  }

  render() {
    const filterIds = []
    const listings = this.props.listings
    this.props.listings.forEach((listing) => {
      if (this.state.filterYears.includes(listing.year))
        filterIds.push(listing.id)
      else if (this.state.filterMakes.includes(listing.make) && this.state.filterModels.includes(listing.model))
        filterIds.push(listing.id)
      else if (this.state.filterMakes.includes(listing.make) && this.props.makeModels[listing.make].every((model) => this.state.filterModels.includes(model) === false))
        filterIds.push(listing.id)
    })

    listings.sort((a, b) => {
      if (this.state.direction === "ascending")
        return parseInt(a[this.state.sortBy].replace(",", "")) - parseInt(b[this.state.sortBy].replace(",", ""))

      return parseInt(b[this.state.sortBy].replace(",", "")) - parseInt(a[this.state.sortBy].replace(",", ""))
    })

    return (
      <Container fluid={true}>
        <Row>
          <Col xl={2}>
            <FilterSort
              years={this.props.years}
              yearsChecked={this.state.filterYears}
              makesChecked={this.state.filterMakes}
              modelsChecked={this.state.filterModels}
              direction={this.state.direction}
              onDirectionChange={this.handleDirectionChange}
              onYearCheckedChange={this.handleYearChecked}
              onMakeCheckedChange={this.handleMakeChecked}
              onModelCheckedChange={this.handleModelChecked}
              onSortByChange={this.handleSortByChanged}
              makeModels={this.props.makeModels}
            />
          </Col>
          <Col xl={10}>
            <Container fluid={true}>
              <Row>
                {listings.map((listing) => {
                  if (filterIds.length === 0 || filterIds.includes(listing.id))
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

