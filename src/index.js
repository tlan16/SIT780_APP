import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './styles.sass'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'

const reactContainerId = 'react-root'

const component = () => {
  const element = document.createElement('div')
  element.id = reactContainerId

  return element
}

document.body.appendChild(component())

ReactDOM.render(
  React.createElement(App),
  document.getElementById(reactContainerId)
)
