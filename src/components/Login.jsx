import React from 'react'
import ReactMarkdown from 'react-markdown'
import Recaptcha from 'react-recaptcha'
import {Button, Clearfix, Col, ControlLabel, Form, FormControl, FormGroup, Jumbotron} from 'react-bootstrap'
import {login} from "../services/login"

export default class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      formData: {
        studentId: '',
        password: '',
        captcha: false,
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

  onCaptcha= () => {
    this.setState({
      formData: {
        ...this.state.formData,
        captcha: true,
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
            required
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
            required
            type="password"
            placeholder="Password"
            onChange={this.onPasswordChange}
            value={this.state.password}
          />
        </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalCaptcha">
        <Col componentClass={ControlLabel} sm={2}>
          &nbsp;
        </Col>
        <Col sm={10}>
          <Recaptcha
            sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY}
            render="explicit"
            verifyCallback={this.onCaptcha}
          />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={10}>
          {this.state.formData.captcha ? <Button type="submit">Sign in</Button> : undefined}
        </Col>
      </FormGroup>
    </Form>
  )

  render() {
    return (
      <div>
        {this.testUserInfo}
        <Jumbotron>
          {this.getLoginForm()}
        </Jumbotron>
      </div>
    )
  }
}