# iisuser
Middleware to parse the iis username from headers passed by iisnode and set on the request.

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
