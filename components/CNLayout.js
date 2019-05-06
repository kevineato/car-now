import Navigation from './CNNavigation'
import React from 'react'

class Layout extends React.Component {
  constructor(props) {
    super(props)

    this.state = {isLoggedIn: false}
  }
  componentDidMount() {
    if (sessionStorage.getItem("loggedIn") === "true")
      this.setState({isLoggedIn: true})
  }

  render() {
    return (
      <div>
        <Navigation navActive={this.props.navActive} loggedIn={this.state.isLoggedIn} />
        {this.props.children}
      </div>
    )
  }
}

export default Layout
