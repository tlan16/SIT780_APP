import React from 'react'
import Jumbotron from 'react-bootstrap/lib/Jumbotron'
import Button from 'react-bootstrap/lib/Button'

class HelloWorld extends React.Component {
  render() {
    return (
      <div className={'container'}>
        <Jumbotron>
          <h1>Hello, world!</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
          </p>
          <p>
            <Button bsStyle="primary">Learn more</Button>
          </p>
        </Jumbotron>
      </div>
    )
  }
}

export default HelloWorld