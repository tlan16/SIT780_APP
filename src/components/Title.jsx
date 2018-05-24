import React from 'react'
import {Jumbotron} from 'react-bootstrap'

class Title extends React.Component {
  styles = {
    Jumbotron: {
      'padding': '6px 60px 24px 60px',
    },
  }

  render() {
    return (
      <Jumbotron style={this.styles.Jumbotron}>
        <h2>SIT 780</h2>
        <p>
          This is a React application powered with webpack.
        </p>
        <p>
          -- Made with <i className="fa fa-heart text-danger" /> By <i>Frank Lan</i>
        </p>
      </Jumbotron>
    )
  }
}

export default Title