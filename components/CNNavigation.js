import Link from 'next/link'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import React from 'react'
import Router from 'next/router'

class Navigation extends React.Component {
  constructor(props) {
    super(props)

    this.handleLogOut = this.handleLogOut.bind(this)
    this.submitSearch = this.submitSearch.bind(this)
  }

  handleLogOut() {
    sessionStorage.setItem("loggedIn", "false")
    location.replace("http://localhost:3000")
  }

  submitSearch(e) {
    e.preventDefault()
    e.stopPropagation()
    const form = e.currentTarget
    const text = form.elements["searchText"].value
    Router.push(`/browse/${text}`)
  }

  render() {
    if (!this.props["loggedIn"]) {
      this.loginLink = (
        <Link href="/login">
          <Nav.Link href="/login" eventKey="/login">
            Login
          </Nav.Link>
        </Link>
      )
    } else {
      this.loginLink = (
        <Nav.Link type="button" className="btn btn-danger text-white" onClick={this.handleLogOut}>
          Logout
        </Nav.Link>
      )
    }

    return (
      <Navbar collapseOnSelect expand="md" sticky="top" bg="dark" variant="dark">
        <Navbar.Brand>
          <Link href="/">
            <a style={{color: 'white'}}>Car Now</a>
          </Link>
        </Navbar.Brand>
        <form method="post" className="form-inline d-md-none" onSubmit={this.submitSearch}>
          <div className="input-group input-group-sm">
            <input type="text" className="form-control" name="searchText" placeholder="Search"
                   aria-label="Search" aria-describedby="search" />
            <div className="input-group-append">
              <button className="btn btn-primary" type="submit" id="search"><i className="fas fa-search"></i></button>
            </div>
          </div>
        </form>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" variant="pills" activeKey={this.props.navActive}>
            <Link href="/">
              <Nav.Link href="/" eventKey="/">
                Home
              </Nav.Link>
            </Link>
            <Link href="/browse">
              <Nav.Link href="/browse" eventKey="/browse">
                Browse
              </Nav.Link>
            </Link>
          </Nav>
          <Nav variant="pills" activeKey="">
            <form method="post" className="form-inline d-none d-md-flex" onSubmit={this.submitSearch}>
              <div className="input-group">
                <input type="text" className="form-control" name="searchText" placeholder="Search"
                       aria-label="Search" aria-describedby="search" />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="submit" id="search"><i className="fas fa-search"></i></button>
                </div>
              </div>
            </form>
            {this.loginLink}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Navigation