import React from 'react'
import Title from './components/Title'
import Login from "./components/Login"

class App extends React.Component {
  state = {
    authToken: undefined,
  }

  onLogin = authToken => {
    this.setState({authToken})
  }

  render() {
    return (
      <div className={'container'}>
        <Title />
        <Login
          onLogin={this.onLogin}
        />
      </div>
    )
  }
}

export default App