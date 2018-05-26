import React from 'react'
import get from 'lodash.get'
import {Redirect, Route} from "react-router-dom"
import Login from "./components/Login"
import List from "./components/Student/List"
import Sensors from "./components/Sensors"
import Welcome from "./components/Welcome"
import Header from './components/Header'
import Logout from "./components/Logout"
import New from "./components/Student/New"

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

  getIsAdmin = () => get(this.state.auth, 'isAdmin', false)

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
            exact
            path="/new_student"
            render={props =>
              this.hasValidSession() ?
                <New
                  {...props}
                  authToken={this.getAuthToken()}
                />
                : <Redirect
                  to={{
                    pathname: "/login",
                    state: {from: props.location},
                  }}
                />
            }
          />
          <Route
            exact
            path="/students"
            render={props =>
              this.hasValidSession() ?
                <List
                  {...props}
                  authToken={this.getAuthToken()}
                  isAdmin={this.getIsAdmin()}
                />
                : <Redirect
                  to={{
                    pathname: "/login",
                    state: {from: props.location},
                  }}
                />
            }
          />
          <Route
            path="/sensors"
            render={props =>
              this.hasValidSession() ?
                <Sensors
                  {...props}
                  authToken={this.getAuthToken()}
                />
                : <Redirect
                  to={{
                    pathname: "/login",
                    state: {from: props.location},
                  }}
                />
            }
          />
          <Route
            path="/welcome"
            render={props =>
              this.hasValidSession() ?
                <Welcome
                  {...props}
                  auth={this.state.auth}
                />
                : <Redirect
                  to={{
                    pathname: "/login",
                    state: {from: props.location},
                  }}
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