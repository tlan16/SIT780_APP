import React from 'react'

export default class EmailLink extends React.Component {
  render() {
    return (
      <a
        href={"mailto:" + this.props.email}
        target={this.props.target}
      >
        {this.props.text || this.props.email}
      </a>
    )
  }
}