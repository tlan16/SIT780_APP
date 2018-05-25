import React from 'react'
import get from 'lodash.get'
import Title from './components/Title'
import Login from "./components/Login"
import Students from "./components/Students"
import Sensors from "./components/Sensors"

class App extends React.Component {
  state = {
    auth: undefined,
  }

  onLogin = auth => {
    this.setState({auth})
  }

  hasValidSession = () => {
    const expiry = get(this.state.auth, 'session.expiry', undefined)
    return expiry && (new Date(expiry)) > Date.now()
  }

  render() {
    const authToken = get(this.state.auth, 'session.token', '')

    return (
      <div className={'container'}>
        <Title
          auth={this.state.auth}
        />
        {
          this.hasValidSession() ?
            (
              <span>
                <h1>Students</h1>
                <Students
                  authToken={authToken}
                />
                <Sensors
                  authToken={authToken}
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