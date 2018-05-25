import React from 'react'
import {Nav, Navbar, NavItem} from 'react-bootstrap'
import {LinkContainer} from "react-router-bootstrap"
import get from "lodash.get"

export default class Header extends React.Component {
  constructor (props) {
    super(props)
    if (!props.hasValidSession)
      props.history.push('/login')
  }

  getFullname = () => {
    const firstname = get(this.props.auth, 'student.firstname', '')
    const lastname = get(this.props.auth, 'student.lastname', '')
    return `${firstname} ${lastname}`
  }

  getIsAdmin = () => get(this.props.auth, 'isAdmin', false)

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

  userInfo = (
    <Navbar.Text pullRight>
      Signed in as: {this.getFullname()}
      {this.getIsAdmin() ? <i> (Admin)</i> : undefined}
    </Navbar.Text>
  )

  render() {
    return (
      <Navbar fluid>
        {this.wellcome}
        {this.props.hasValidSession ? this.tabs : undefined}
        {this.props.hasValidSession ? this.logout : undefined}
        {this.props.hasValidSession ? this.userInfo : undefined}
      </Navbar>
    )
  }
}