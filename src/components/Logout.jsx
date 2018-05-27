import React from 'react'
import {Button, Jumbotron} from 'react-bootstrap'
import {Link} from "react-router-dom"

export default class Logout extends React.Component {
  constructor(props) {
    super(props)
    props.onLogout()
  }

  render() {
    return (
      <Jumbotron>
        <h1>You are now logged off</h1>
        <Link to="/login"><Button>Click here to login ...</Button></Link>
      </Jumbotron>
    )
  }
}