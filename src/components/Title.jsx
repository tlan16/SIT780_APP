import React from 'react'
import {Jumbotron} from 'react-bootstrap'

class Title extends React.Component {
  styles = {
    Jumbotron: {
      'padding': '6px 60px 6px 60px',
    },
  }

  render() {
    return (
      <Jumbotron style={this.styles.Jumbotron}>
        <strong>SIT 780</strong>
      </Jumbotron>
    )
  }
}

export default Title