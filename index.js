'use strict'

const merge = require('merge')
const rawUserHeaders = ['auth_user', 'remote_user', 'unmapped_remote_user']
const windowsAccount = 'logon_user'
const prefix = 'x-iisnode-'
const debug = require('debug')('iisuser')

module.exports = (options) => {
  let headersToCheck = [windowsAccount]
  options = merge({reqProperty: 'username'}, options)
  debug(`Initializing 'iisuser' middleware with options: ${options}`)

  return (req, res, next) => {
    if (!options.strict) headersToCheck = headersToCheck.concat(rawUserHeaders)
    debug(`Checking headers: ${JSON.stringify(headersToCheck)}`)

    for (let i = 0; i < headersToCheck.length; i++) {
      let username = req.headers[prefix + headersToCheck[i]]
      if (!username) continue
      if (options.removeDomain) username = username.replace(/^.*\\/, '')
      req[options.reqProperty] = username
      debug(`Username ${username} set on request at req.${options.reqProperty}`)
      break
    }
    next()
  }
}
