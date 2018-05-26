import {Request} from "./superagent"

export const get = autoToken => Request
  .get('/sensor')
  .set('Authorization', `Bearer ${autoToken}`)
  .query(`token=${autoToken}`)