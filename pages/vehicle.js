import { withRouter } from 'next/router'
import React from 'react'

class Vehicle extends React.Component {
  render() {
    const listing = JSON.parse(this.props.router.query.listing)

    return (
      <img src={listing.img_url} />
    )
  }
}

export default withRouter(Vehicle)