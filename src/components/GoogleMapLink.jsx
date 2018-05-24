import React from 'react'

export default class GoogleMapLink extends React.Component {
  render() {
    return (
      <a
        href={"https://maps.google.com/?q=" + this.props.address}
        target={this.props.target}
      >
        {this.props.text || this.props.address}
      </a>
    )
  }
}