# iisuser
Middleware to parse the iis username from headers passed by iisnode and set on the request.

[![Build Status](https://travis-ci.org/mediasuitenz/iisuser.svg)](https://travis-ci.org/mediasuitenz/iisuser)

## Installation

```
npm install --save iisuser
```

## Usage
```js
app.use(iisuser({

  //only accepts iis `logon_user` variable if true
  //accepts `logon_user`, `auth_user`, `remote_user`, `unmapped_remote_user` if false
  //default: false
  strict: false,

  //property to set the username on the request.
  //Eg. if username is myuser, after middleware, req.username = 'myuser'
  //default: 'username'
  reqProperty: 'username',

  //whether to remove domain component from username.
  //Eg. ABC\\myuser -> myuser
  //default: false
  removeDomain: false
}))
```

### Debugging

iisuser can output debugging information if desired.
To turn debugging on use the environment variable `DEBUG=iisuser`
On windows this can be set from the console like so:
```
set DEBUG=iisuser
```
