import {Request} from "./superagent"

const login = (username, password) => {
  return Request
    .post('/login')
    .auth(username, password, {type: 'basic'})
}

export {
  login,
}