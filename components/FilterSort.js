import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import React from 'react'

class FilterSort extends React.Component {
  constructor(props) {
    super(props)

    this.handleYearChecked = this.handleYearChecked.bind(this)
    this.handleMakeChecked = this.handleMakeChecked.bind(this)
    this.handleModelChecked = this.handleModelChecked.bind(this)
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

  getMakeModelsCheckboxes(makeModels) {
    let final = []
    Object.keys(makeModels).forEach((make) => {
        final.push(<Form.Check onChange={this.handleMakeChecked} id={make} key={make} type="checkbox" label={make} />)
      makeModels[make].forEach((model) => {
        final.push(<Form.Check className={this.props.makesChecked.includes(make) ? "ml-5" : "d-none"} onChange={this.handleModelChecked} id={model} key={model} type="checkbox" label={model} />)
      })
    })
    return final
  }

  render() {
    const makeModels = this.getMakeModelsCheckboxes(this.props.makeModels)

    return (
      <Card className="my-3" style={{ boxShadow: '7px 5px 20px' }}>
        <Card.Body>
          <Form>
            <Form.Group controlId="formFilterYear">
              <Form.Label><h5>Year</h5></Form.Label>
              {this.props.years.map((year) => (
                <Form.Check onChange={this.handleYearChecked} id={year} key={year} type="checkbox" label={year} />
              ))}
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
