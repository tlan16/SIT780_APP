import React from 'react'
import Title from './components/Title'
import Login from "./components/Login"
import Students from "./components/Students"

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
        {
          this.state.authToken ?
            (
              <span>
                <h1>Students</h1>
                <Students
                  authToken={this.state.authToken}
                />
              </span>
            ) : (
              <Login
                onLogin={this.onLogin}
              />
            )
        }
      </div>
    )
  }
}

export default App