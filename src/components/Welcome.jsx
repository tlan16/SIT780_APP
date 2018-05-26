import React from 'react'
import {Button, Clearfix, Jumbotron, PageHeader} from 'react-bootstrap'
import {Link} from "react-router-dom"
import get from "lodash.get"

export default class Welcome extends React.Component {
  getFullname = () => {
    const firstname = get(this.props.auth, 'student.firstname', '')
    const lastname = get(this.props.auth, 'student.lastname', '')
    return `${firstname} ${lastname}`
  }

  getIsAdmin = () => get(this.props.auth, 'isAdmin', false)

  userInfo = (
    <span>
      Signed in as: {this.getFullname()}
      {this.getIsAdmin() ? <i> (Admin)</i> : <i> (Normal User)</i>}
    </span>
  )

  render() {
    console.log(this.props)
    return (
      <Jumbotron>
        <PageHeader>
          Welcome back {this.props.fullName}
          <Clearfix />
          <small>{this.userInfo}</small>
        </PageHeader>
        <Link to="/students"><Button>Students</Button></Link>
        <Link to="/sensors"><Button>Sensors</Button></Link>
      </Jumbotron>
    )
  }
}
