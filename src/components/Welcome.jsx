import React from 'react'
import {Button, Jumbotron} from 'react-bootstrap'
import {Link} from "react-router-dom"

export default class Welcome extends React.Component {
  render() {
    return (
      <Jumbotron>
        <h1>Welcome back {this.props.fullName}</h1>
        <h2>Kind reminder: Your session will end automatically 1 hour without activity</h2>
        <Link to="/students"><Button>Students</Button></Link>
        <Link to="/sensors"><Button>Sensors</Button></Link>
      </Jumbotron>
    )
  }
}
