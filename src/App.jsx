import React from 'react'
import get from 'lodash.get'
import {Route} from "react-router-dom"
import Login from "./components/Login"
import Students from "./components/Students"
import Sensors from "./components/Sensors"
import Welcome from "./components/Welcome"
import Header from './components/Header'
import Logout from "./components/Logout"

export const localStorageAuthKey = 'auth'

export default class App extends React.Component {
  state = {
    auth: undefined,
  }

  constructor() {
    super()
    try {
      this.state = {
        auth: JSON.parse(localStorage.getItem(localStorageAuthKey)),
      }
    } catch (e) { // ignore}
    }
  }

  onLogin = auth => {
    this.setState({
      auth: auth,
    })
    localStorage.setItem(localStorageAuthKey, JSON.stringify(auth))
  }

  onLogout = () => {
    localStorage.clear()
    this.setState({
      auth: undefined,
    })
  }

  hasValidSession = () => {
    const expiry = get(this.state.auth, 'session.expiry', undefined)
    return expiry && (new Date(expiry)) > Date.now()
  }

  getAuthToken = () => get(this.state.auth, 'session.token', '')

  render() {
    return (
      <div className={'container-fluid'}>
        <div>
          <Route render={({history}) => (
            <Header
              history={history}
              auth={this.state.auth}
              hasValidSession={this.hasValidSession()}
              onLogout={this.onLogout}
            />
          )} />
          <Route
            exact path="/"
            render={props =>
              <Login
                {...props}
                onLogin={this.onLogin}
                hasValidSession={this.hasValidSession}
              />
            }
          />
          <Route
            path="/students"
            render={props =>
              <Students
                {...props}
                authToken={this.getAuthToken()}
              />
            }
          />
          <Route
            path="/sensors"
            render={props =>
              <Sensors
                {...props}
                authToken={this.getAuthToken()}
              />
            }
          />
          <Route
            path="/welcome"
            render={props =>
              <Welcome
                {...props}
              />
            }
          />
          <Route
            path="/login"
            render={props =>
              <Login
                {...props}
                onLogin={this.onLogin}
                hasValidSession={this.hasValidSession()}
              />
            }
          />
          <Route
            path="/logout"
            render={props =>
              <Logout
                {...props}
                onLogout={this.onLogout}
              />
            }
          />
        </div>
      </div>
    )
  }
}