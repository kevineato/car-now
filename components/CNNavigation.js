import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export default function Navigation(props) {
  return (
    <Navbar collapseOnSelect expand="lg" sticky="top" bg="dark" variant="dark">
      <Navbar.Brand>
        <Link href="/">
          <a>Car Now</a>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav variant="pills" defaultActiveKey={props.navActive} className="mr-auto">
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
          <Link href="/about">
            <Nav.Link href="/about" eventKey="/about">
              About
            </Nav.Link>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}