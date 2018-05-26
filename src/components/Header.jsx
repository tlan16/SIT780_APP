import React from 'react'
import {Nav, Navbar, NavItem} from 'react-bootstrap'
import {LinkContainer} from "react-router-bootstrap"

export default class Header extends React.Component {
  constructor (props) {
    super(props)
    if (!props.hasValidSession)
      props.history.push('/login')
  }

  wellcome = (
    <Navbar.Header>
      <Navbar.Brand>
        <LinkContainer to="/">
          <a>Welcome</a>
        </LinkContainer>
      </Navbar.Brand>
    </Navbar.Header>
  )

  tabs = (
    <Nav>
      <LinkContainer to="/students">
        <NavItem>Students</NavItem>
      </LinkContainer>
      <LinkContainer to="/sensors">
        <NavItem>Sensors</NavItem>
      </LinkContainer>
    </Nav>
  )

  onLogout = () => {
    this.props.onLogout()
    this.props.history.push('/logout')
  }

  logout = (
    <Nav pullRight>
      <NavItem onClick={this.onLogout}>Logout</NavItem>
    </Nav>
  )

  render() {
    return (
      <Navbar fluid>
        {this.wellcome}
        {this.props.hasValidSession ? this.tabs : undefined}
        {this.props.hasValidSession ? this.logout : undefined}
      </Navbar>
    )
  }
}