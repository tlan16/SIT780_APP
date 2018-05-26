import superagent from 'superagent'
import superagentAbsolute from 'superagent-absolute'

const agent = superagent.agent()
export const BaseUrl = process.env.API_URL
export const Request = superagentAbsolute(agent)(BaseUrl)

Request.on('error', err => {
  if (err.status === 403) {
    localStorage.clear()
    window.location.href = '/'
  }
})