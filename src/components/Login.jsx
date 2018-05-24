import React from 'react'
import ReactMarkdown from 'react-markdown'
import {Button, Col, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap'
import {login} from "../services/login"

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      formData: {
        studentId: '',
        password: '',
      },
    }
  }

  login = event => {
    event.preventDefault()
    console.log(this.state.formData)

    login(this.state.formData.studentId, this.state.formData.password)
      .then(res => {
        if (res.text && res.text.length)
          this.props.onLogin(res.text)
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

  render() {
    return (
      <Form horizontal onSubmit={this.login}>
        <FormGroup controlId="formHorizontalInfo">
          <Col sm={12} className="text-right">
            <ControlLabel>
              <ReactMarkdown source="**Admin user** username: `lanti`, password: `password`" />
            </ControlLabel>
            <br />
            <ControlLabel>
              <ReactMarkdown source="**Normal user** username: `user`, password: `password`" />
            </ControlLabel>
          </Col>
        </FormGroup>

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
  }
}

export default Login