import Link from 'next/link'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export default function Navigation(props) {
  return (
    <Navbar collapseOnSelect expand="lg" sticky="top" bg="dark" variant="dark">
      <Navbar.Brand>
        <Link href="/">
          <a style={{ color: 'white' }}>Car Now</a>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav variant="pills" activeKey={props.navActive}>
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
          <Link href="/login">
            <Nav.Link href="/login" eventKey="/login">
              Login
            </Nav.Link>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}