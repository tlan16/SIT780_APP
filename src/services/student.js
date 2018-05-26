import {Request} from "./superagent"

export const get = autoToken => Request
  .get('/students')
  .set('Authorization', `Bearer ${autoToken}`)
