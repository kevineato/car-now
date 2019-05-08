import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import fetch from 'isomorphic-unfetch'
import FilterSort from '../components/FilterSort'
import Row from 'react-bootstrap/Row'
import React from 'react'
import SearchInput, { createFilter } from 'react-search-input'
import VehicleCard from '../components/VehicleCard'
import Router, { withRouter } from 'next/router'

const FILTER_KEYS = ["year", "make", "model", "trim", "body_style", "exterior_color"]

class Browse extends React.Component {
  constructor(props) {
    super(props)

    this.handleDirectionChange = this.handleDirectionChange.bind(this)
    this.handleYearChecked = this.handleYearChecked.bind(this)
    this.handleMakeChecked = this.handleMakeChecked.bind(this)
    this.handleModelChecked = this.handleModelChecked.bind(this)
    this.handleSearchUpdated = this.handleSearchUpdated.bind(this)
    this.handleSortByChanged = this.handleSortByChanged.bind(this)
    this.handleClearFilters = this.handleClearFilters.bind(this)

    this.state = {
      filterYears: [],
      filterModels: [],
      filterMakes: [],
      sortBy: "price",
      direction: "ascending",
      searchText: this.props.router.query.searchText || "",
      displayClearButton: (this.props.router.query.searchText) ? true : false
    }
  }

  componentWillUnmount() {
    sessionStorage.setItem("filterYears", this.state.filterYears.toString())
    sessionStorage.setItem("filterMakes", this.state.filterMakes.toString())
    sessionStorage.setItem("filterModels", this.state.filterModels.toString())
    sessionStorage.setItem("sortBy", this.state.sortBy)
    sessionStorage.setItem("direction", this.state.direction)
    sessionStorage.setItem("displayClearButton", this.state.displayClearButton.toString())
  }

  componentDidMount() {
    let filterYears = []
    let filterMakes = []
    let filterModels = []
    let sortBy = "price"
    let direction = "ascending"
    let displayClearButton = false
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
    if (sessionStorage.getItem("displayClearButton"))
      displayClearButton = sessionStorage.getItem("displayClearButton") === "true" ? true : false

    this.setState({
      filterYears: filterYears,
      filterMakes: filterMakes,
      filterModels: filterModels,
      sortBy: sortBy,
      direction: direction,
      displayClearButton: displayClearButton
    })
  }

  handleDirectionChange(value) {
    this.setState({ direction: value.id, displayClearButton: true })
  }

  handleYearChecked(yearChecked, label) {
    if (yearChecked) {
      this.setState((prevState, props) => ({
        filterYears: [...new Set([...prevState.filterYears, label])],
        displayClearButton: true
      }))
    } else {
      this.setState((prevState, props) => ({
        filterYears: [...new Set(prevState.filterYears.filter(year => year !== label))],
        displayClearButton: true
      }))
    }
  }

  handleMakeChecked(makeChecked, label) {
    if (makeChecked) {
      this.setState((prevState, props) => ({
        filterMakes: [...new Set([...prevState.filterMakes, label])],
        displayClearButton: true
      }))
    } else {
      this.setState((prevState, props) => ({
        filterMakes: [...new Set(prevState.filterMakes.filter(make => make !== label))],
        filterModels: [...new Set(prevState.filterModels.filter(model => this.props.makeModels[label].includes(model) === false))],
        displayClearButton: true
      }))
    }
  }

  handleModelChecked(modelChecked, label) {
    if (modelChecked) {
      this.setState((prevState, props) => ({
          filterModels: [...new Set([...prevState.filterModels, label])],
          displayClearButton: true
      }))
    } else {
      this.setState((prevState, props) => ({
        filterModels: [...new Set(prevState.filterModels.filter(model => model !== label))],
        displayClearButton: true
      }))
    }
  }

  handleSortByChanged(value) {
    this.setState({ sortBy: value.toLowerCase(), displayClearButton: true })
  }

  handleSearchUpdated(e) {
    this.setState({ searchText: e.currentTarget.value, displayClearButton: (e.currentTarget.value === "") ? false : true })
  }

  handleClearFilters() {
    this.setState({
      filterYears: [],
      filterModels: [],
      filterMakes: [],
      sortBy: "price",
      direction: "ascending",
      searchText: "",
      displayClearButton: false
    })

    this.props.router.push("http://localhost:300/browse")
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
    const handleRouteChange = (url) => {
      let state = {
        url: `/browse/${this.state.searchText}`,
        as: `/browse/${this.state.searchText}`
      }
      window.history.pushState(state, "Car Now", `/browse`)
    }

    Router.events.on("routeChangeStart", handleRouteChange)
    const searchListings = this.props.listings.filter(createFilter(this.state.searchText, FILTER_KEYS))

    const filterIds = []
    const listings = searchListings.length === 0 ? (this.state.searchText.length === 0 ? this.props.listings : null) : searchListings
    if (listings != null) {
      listings.forEach((listing) => {
        if (this.state.filterYears.length !== 0) {
          if (this.state.filterYears.includes(listing.year) && this.state.filterMakes.length !== 0) {
            if (this.state.filterModels.length === 0 && this.state.filterYears.includes(listing.year) && this.state.filterMakes.includes(listing.make))
              filterIds.push(listing.id)
            else if (this.state.filterModels.length !== 0 && this.state.filterYears.includes(listing.year) && this.state.filterMakes.includes(listing.make) && this.state.filterModels.includes(listing.model))
              filterIds.push(listing.id)
          }
          else if (this.state.filterYears.includes(listing.year) && this.state.filterMakes.length === 0)
            filterIds.push(listing.id)
        }
        else if (this.state.filterMakes.includes(listing.make) && this.state.filterModels.includes(listing.model))
          filterIds.push(listing.id)
        else if (this.state.filterMakes.includes(listing.make) && this.props.makeModels[listing.make].every((model) => this.state.filterModels.includes(model) === false))
          filterIds.push(listing.id)
        else if (this.state.filterYears.length === 0 && this.state.filterMakes.length === 0 && this.state.filterModels.length === 0)
          filterIds.push(listing.id)
      })
    }

    if (listings != null) {
      listings.sort((a, b) => {
        if (this.state.direction === "ascending")
          return parseInt(a[this.state.sortBy].replace(",", "")) - parseInt(b[this.state.sortBy].replace(",", ""))

        return parseInt(b[this.state.sortBy].replace(",", "")) - parseInt(a[this.state.sortBy].replace(",", ""))
      })
    }

    return (
      <Container fluid={true}>
        <Row>
          <Col xl={3}>
            <a className="btn btn-sm ml-2 d-xl-none btn-outline-dark my-3" href="#collapseFilters" data-toggle="collapse" aria-expanded="false" aria-controls="collapseFilters">Filters</a>
            <div className="collapse d-xl-block" id="collapseFilters">
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
                onClearFilters={this.handleClearFilters}
                makeModels={this.props.makeModels}
                shouldDisplayButton={this.state.displayClearButton}
              />
            </div>
          </Col>
          <Col xl={9}>
            <SearchInput className="d-none search-input" inputClassName="d-none" placeholder="Search" aria-label="Search" aria-describedby="search" value={this.state.searchText} />
            <div className="input-group ml-2 my-xl-3 w-50">
              <input type="text" className="form-control" name="searchText" placeholder="Search"
                     aria-label="Search" aria-describedby="search" onChange={this.handleSearchUpdated} value={this.state.searchText} />
              <div className="input-group-append">
                <button className="btn btn-primary" type="submit" id="search"><i className="fas fa-search"></i></button>
              </div>
            </div>
            <Container fluid={true}>
              <Row>
                {(listings != null) ? listings.map((listing) => {
                  if (filterIds.includes(listing.id))
                  return (
                    <Col key={listing.id.toString()} xl={6}>
                      <VehicleCard buy listing={listing} />
                    </Col>
                  )
                }) : null}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withRouter(Browse)

