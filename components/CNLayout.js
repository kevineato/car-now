import Navigation from './CNNavigation'
import React from 'react'

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Navigation navActive={this.props.navActive} />
        {this.props.children}
      </div>
    )
  }
}

export default Layout
