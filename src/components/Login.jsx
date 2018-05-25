import React from 'react'
import ReactMarkdown from 'react-markdown'
import {Button, Clearfix, Col, ControlLabel, Form, FormControl, FormGroup, Jumbotron} from 'react-bootstrap'
import {login} from "../services/login"

export default class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      formData: {
        studentId: 'lanti',
        password: 'password',
      },
    }

    if (props.hasValidSession)
      props.history.push('/welcome')
  }

  login = event => {
    event.preventDefault()

    login(this.state.formData.studentId, this.state.formData.password)
      .then(res => {
        if (res.body && res.text.length)
          this.props.onLogin(res.body)
        this.props.history.push('/welcome')
      })
  }

  onStudentIdChange = event => {
    event.preventDefault()
    this.setState({
      formData: {
        ...this.state.formData,
        studentId: event.target.value,
      },
    })
  }

  onPasswordChange = event => {
    event.preventDefault()
    this.setState({
      formData: {
        ...this.state.formData,
        password: event.target.value,
      },
    })
  }

  testUserInfo = (
    <span className="text-right">
      <ReactMarkdown source="**Admin user** username: `lanti`, password: `password`" />
      <Clearfix />
      <ReactMarkdown source="**Normal user** username: `user`, password: `password`" />
    </span>
  )

  getLoginForm = () => (
    <Form horizontal onSubmit={this.login}>
      <FormGroup controlId="formHorizontalStudentId">
        <Col componentClass={ControlLabel} sm={2}>
          Student ID
        </Col>
        <Col sm={10}>
          <FormControl
            type="username"
            placeholder="Student ID"
            onChange={this.onStudentIdChange}
            value={this.state.formData.studentId}
          />
        </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalPassword">
        <Col componentClass={ControlLabel} sm={2}>
          Password
        </Col>
        <Col sm={10}>
          <FormControl
            type="password"
            placeholder="Password"
            onChange={this.onPasswordChange}
            value={this.state.password}
          />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type="submit">Sign in</Button>
        </Col>
      </FormGroup>
    </Form>
  )

  render() {
    return (
      <span>
        {this.testUserInfo}
        <Jumbotron>
          {this.getLoginForm()}
        </Jumbotron>
      </span>
    )
  }
}