import superagent from 'superagent'
import superagentAbsolute from 'superagent-absolute'

const agent = superagent.agent()
const baseUrl = process.env.API_URL
const request = superagentAbsolute(agent)(baseUrl)

export {
  request as Request,
  baseUrl as BaseURl,
}