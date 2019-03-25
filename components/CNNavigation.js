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
          <Nav.Link eventKey="home">
            <Link href="/">
              <a>Home</a>
            </Link>
          </Nav.Link>
          <Nav.Link eventKey="browse">
            <Link href="/browse">
              <a>Browse</a>
            </Link>
          </Nav.Link>
          <Nav.Link eventKey="about">
            <Link href="/about">
              <a>About</a>
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <style jsx>{`
        a {
          color: white;
        }
      `}</style>
    </Navbar>
  )
}