import React from 'react'
import {Jumbotron} from 'react-bootstrap'
import moment from 'moment'
import get from "lodash.get"

class Title extends React.Component {
  styles = {
    Jumbotron: {
      'padding': '6px 60px 6px 60px',
    },
  }

  hasValidSession = () => {
    const expiry = get(this.props.auth, 'session.expiry', undefined)
    return expiry && (new Date(expiry)) > Date.now()
  }

  getSessionLeft = () => {
    const expiry = new moment(
      get(this.props.auth, 'session.expiry', undefined),
    )

    return moment.duration(expiry.diff(moment.now()))
  }

  getFullname = () => {
    let firstname = get(this.props.auth, 'student.firstname', '')
    const lastname = get(this.props.auth, 'student.lastname', '')
    if (firstname.length) firstname += ''
    return firstname + lastname
  }

  getIsAdmin = () => {
    return get(this.props.auth, 'isAdmin', false)
  }

  render() {
    return (
      <span>
        {
          this.hasValidSession() ? (
            <Jumbotron style={this.styles.Jumbotron}>
              <span>Welcome </span>
              {this.getIsAdmin() ? <i className="text-danger">Admin </i> : undefined}
              <span>{this.getFullname()}</span>
              <i className="pull-right">Session expire in {this.getSessionLeft().humanize()}</i>
            </Jumbotron>
          ) : undefined
        }
      </span>
    )
  }
}

export default Title