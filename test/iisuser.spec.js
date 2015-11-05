'use strict'
/*global describe, Then, Given, When*/
const iisuser = require('../index.js')
const spy = require('spy')
const expect = require('chai').expect

describe('iisuser middleware', () => {
  describe('called with no options', () => {
    let req, middleware

    Given(() => req = {headers: {'x-iisnode-logon_user': 'andrew'}})
    When(() => middleware = iisuser())
    When(done => middleware(req, {}, done))
    Then((done) => {
      expect(req.username).to.equal('andrew')
      done()
    })
  })

  describe('set user req property', () => {
    let req, middleware, options

    Given(() => options = {reqProperty: 'user'})
    Given(() => req = {headers: {'x-iisnode-logon_user': 'andrew'}})
    When(() => middleware = iisuser(options))
    When(done => middleware(req, {}, done))
    Then((done) => {
      expect(req.user).to.equal('andrew')
      done()
    })
  })

  describe('strict mode', () => {
    let req, middleware, options

    Given(() => options = {strict: true})
    Given(() => req = {headers: {'x-iisnode-auth_user': 'andrew'}})
    When(() => middleware = iisuser(options))
    When(done => middleware(req, {}, done))
    Then((done) => {
      expect(req.username).to.be.undefined
      done()
    })
  })

  describe('remove domain from username', () => {
    let req, middleware, options

    Given(() => options = {removeDomain: true})
    Given(() => req = {headers: {'x-iisnode-logon_user': 'DOMAIN:\\andrew'}})
    When(() => middleware = iisuser(options))
    When(done => middleware(req, {}, done))
    Then((done) => {
      expect(req.username).to.equal('andrew')
      done()
    })
  })

  describe('parses auth_user', () => {
    let req, middleware, options

    Given(() => req = {headers: {'x-iisnode-auth_user': 'andrew'}})
    When(() => middleware = iisuser(options))
    When(done => middleware(req, {}, done))
    Then((done) => {
      expect(req.username).to.equal('andrew')
      done()
    })
  })

  describe('parses remote_user', () => {
    let req, middleware, options

    Given(() => req = {headers: {'x-iisnode-remote_user': 'andrew'}})
    When(() => middleware = iisuser(options))
    When(done => middleware(req, {}, done))
    Then((done) => {
      expect(req.username).to.equal('andrew')
      done()
    })
  })

  describe('parses unmapped_remote_user', () => {
    let req, middleware, options

    Given(() => req = {headers: {'x-iisnode-unmapped_remote_user': 'andrew'}})
    When(() => middleware = iisuser(options))
    When(done => middleware(req, {}, done))
    Then((done) => {
      expect(req.username).to.equal('andrew')
      done()
    })
  })

  describe('middleware next() gets called', () => {
    let req, middleware, cb

    Given(() => cb = spy())
    Given(() => req = {headers: {'x-iisnode-logon_user': 'andrew'}})
    When(() => middleware = iisuser())
    When(() => middleware(req, {}, cb))
    Then((done) => {
      expect(cb.callCount).to.equal(1)
      done()
    })
  })

  describe('nothing is set when headers are not present', () => {
    let req, middleware

    Given(() => req = {headers: {}})
    When(() => middleware = iisuser())
    When(done => middleware(req, {}, done))
    Then((done) => {
      expect(req.username).to.be.undefined
      done()
    })
  })
})
