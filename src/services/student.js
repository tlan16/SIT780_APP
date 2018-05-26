import {Request} from "./superagent"

export const get = autoToken => Request
  .get('/students')
  .set('Authorization', `Bearer ${autoToken}`)
  .query(`token=${autoToken}`)

export const create = autoToken => Request
  .post('/student')
  .type('form')
  .set('Authorization', `Bearer ${autoToken}`)
  .query({ token: autoToken })
