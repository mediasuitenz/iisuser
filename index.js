'use strict'

const merge = require('merge')
const rawUserHeaders = ['auth_user', 'remote_user', 'unmapped_remote_user']
const windowsAccount = 'logon_user'
const prefix = 'x-iisnode-'

module.exports = (options) => {
  let headersToCheck = [windowsAccount]
  options = merge({reqProperty: 'username'}, options)

  return (req, res, next) => {
    if (!options.strict) headersToCheck = headersToCheck.concat(rawUserHeaders)

    for (let i = 0; i < headersToCheck.length; i++) {
      let username = req.headers[prefix + headersToCheck[i]]
      if (!username) continue
      if (options.removeDomain) username = username.replace(/^.*\\/, '')
      req[options.reqProperty] = username
      break
    }
    next()
  }
}
