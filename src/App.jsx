import React from 'react'
import Title from './components/Title'

class App extends React.Component {
  state = {
    voice: undefined,
  }

  render() {
    return (
      <div className={'container'}>
        <Title />
      </div>
    )
  }
}

export default App