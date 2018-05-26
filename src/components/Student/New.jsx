import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Jumbotron, PageHeader} from 'react-bootstrap'
import {create} from "../../services/student"

export default class New extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      formData: {
        id: '',
        email: '',
        firstname: '',
        lastname: '',
        address: '',
      },
    }

    if (props.hasValidSession)
      props.history.push('/welcome')
  }

  create = event => {
    event.preventDefault()

    create(this.props.authToken)
      .send(this.state.formData)
      .then(() => {
        this.props.history.push('/students')
      })
  }

  handleChange = address => {
    this.setState({
      formData: {
        ...this.state.formData,
        address: address,
      },
    })
  }

  onStudentIdChange = event => {
    event.preventDefault()
    this.setState({
      formData: {
        ...this.state.formData,
        id: event.target.value,
      },
    })
  }

  onEmailChange = event => {
    event.preventDefault()
    this.setState({
      formData: {
        ...this.state.formData,
        email: event.target.value,
      },
    })
  }

  onFirstnameChange = event => {
    event.preventDefault()
    this.setState({
      formData: {
        ...this.state.formData,
        firstname: event.target.value,
      },
    })
  }

  onLastnameChange = event => {
    event.preventDefault()
    this.setState({
      formData: {
        ...this.state.formData,
        lastname: event.target.value,
      },
    })
  }

  getNewStudentForm = () => (
    <Form horizontal onSubmit={this.create}>
      <FormGroup controlId="formHorizontalStudentId">
        <Col componentClass={ControlLabel} sm={2}>
          Student ID
        </Col>
        <Col sm={10}>
          <FormControl
            required
            type="text"
            placeholder="Student ID"
            label="Student ID"
            onChange={this.onStudentIdChange}
            value={this.state.formData.studentId}
          />
        </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalEmail">
        <Col componentClass={ControlLabel} sm={2}>
          Email
        </Col>
        <Col sm={10}>
          <FormControl
            type="email"
            placeholder="Email"
            label="Email"
            onChange={this.onEmailChange}
            value={this.state.email}
          />
        </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalFirstname">
        <Col componentClass={ControlLabel} sm={2}>
          First Name
        </Col>
        <Col sm={10}>
          <FormControl
            required
            type="text"
            placeholder="First Name"
            label="First Name"
            onChange={this.onFirstnameChange}
            value={this.state.firstname}
          />
        </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalLastname">
        <Col componentClass={ControlLabel} sm={2}>
          Last Name
        </Col>
        <Col sm={10}>
          <FormControl
            required
            type="text"
            placeholder="Last Name"
            label="Last Name"
            onChange={this.onLastnameChange}
            value={this.state.lastname}
          />
        </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalAddress">
        <Col componentClass={ControlLabel} sm={2}>
          Address
        </Col>
        <Col sm={10}>
          <PlacesAutocomplete
            value={this.state.formData.address}
            onChange={this.handleChange}
          >
            {({getInputProps, suggestions, getSuggestionItemProps}) => (
              <div>
                <FormControl
                  required
                  type="text"
                  placeholder="Address"
                  label="Address"
                  onChange={this.onLastnameChange}
                  value={this.state.lastname}
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input',
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {suggestions.map(suggestion => {
                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item'
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? {backgroundColor: '#fafafa', cursor: 'pointer'}
                      : {backgroundColor: '#ffffff', cursor: 'pointer'}
                    return (
                      <div {...getSuggestionItemProps(suggestion, {className, style})}>
                        <span>{suggestion.description}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
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
        <PageHeader>Create new student</PageHeader>
        <Jumbotron>
          {this.getNewStudentForm()}
        </Jumbotron>
      </span>
    )
  }
}