import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import React from 'react'

class FilterSort extends React.Component {
  constructor(props) {
    super(props)

    this.handleDirection = this.handleDirection.bind(this)
    this.handleYearChecked = this.handleYearChecked.bind(this)
    this.handleMakeChecked = this.handleMakeChecked.bind(this)
    this.handleModelChecked = this.handleModelChecked.bind(this)
    this.handleSortBy = this.handleSortBy.bind(this)
  }

  handleDirection(e) {
    this.props.onDirectionChange(e.currentTarget)
  }

  handleYearChecked(e) {
    this.props.onYearCheckedChange(e.currentTarget.checked, e.currentTarget.id)
  }

  handleMakeChecked(e) {
    this.props.onMakeCheckedChange(e.currentTarget.checked, e.currentTarget.id)
  }

  handleModelChecked(e) {
    this.props.onModelCheckedChange(e.currentTarget.checked, e.currentTarget.id)
  }

  handleSortBy(e) {
    this.props.onSortByChange(e.currentTarget.value)
  }

  getMakeModelsCheckboxes(makeModels) {
    let final = []
    Object.keys(makeModels).forEach((make) => {
      let makeChecked = false
      if (this.props.makesChecked.includes(make))
        makeChecked = true
      final.push(<Form.Check checked={makeChecked} onChange={this.handleMakeChecked} id={make} key={make} type="checkbox" label={make} />)
      makeModels[make].forEach((model) => {
        let modelChecked = false
        if (this.props.modelsChecked.includes(model))
          modelChecked = true
        final.push(<Form.Check checked={modelChecked} className={this.props.makesChecked.includes(make) ? "ml-5" : "d-none"} onChange={this.handleModelChecked} id={model} key={model} type="checkbox" label={model} />)
      })
    })
    return final
  }

  render() {
    const makeModels = this.getMakeModelsCheckboxes(this.props.makeModels)
    let ascDirection = false
    let descDirection = false

    if (this.props.direction === "ascending")
      ascDirection = true
    else
      descDirection = true


    return (
      <Card className="my-3" style={{ boxShadow: '7px 5px 20px' }}>
        <Card.Body>
          <Form>
            <Form.Group controlId="formSortBy">
              <Form.Label><h5>Sort By</h5></Form.Label>
              <Form.Control onChange={this.handleSortBy} as="select">
                <option>Price</option>
                <option>Year</option>
                <option>Miles</option>
              </Form.Control>
            </Form.Group>
            <fieldset>
              <Form.Group>
                <Form.Check checked={ascDirection} onChange={this.handleDirection} type="radio" name="direction" id="ascending" label="Ascending" key="ascending" />
                <Form.Check checked={descDirection} onChange={this.handleDirection} type="radio" name="direction" id="descending" label="Descending" key="descending" />
              </Form.Group>
            </fieldset>
            <Form.Group controlId="formFilterYear">
              <Form.Label><h5>Year</h5></Form.Label>
              {this.props.years.map((year) => {
                let yearChecked = false
                if (this.props.yearsChecked.includes(year))
                  yearChecked = true
                return (<Form.Check checked={yearChecked} onChange={this.handleYearChecked} id={year} key={year} type="checkbox" label={year} />)
              })}
            </Form.Group>
            <Form.Group controlId="formFilterMake">
              <Form.Label><h5>Make</h5></Form.Label>
              {makeModels}
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    )
  }
}

export default FilterSort
