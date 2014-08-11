# Buffer-Up

### Install:
```bash
$ npm i -S buffer-up
```

Buffer-up is a very simple module to use, it is basically to reduce the boilerplate code, which is needed when you have a stream and you want to concat the data emitted into a string and get the data out then end either as a string or if the data is json then as an **object**.

It is really as simple as that!

```javascript
var bufferUp = require('buffer-up')

var bufferContent = bufferUp(function (err, content) {
  if (!err) doSomethingWithContent(content)
})

require('http').get('http://www.example.com', function (res) {
  res.pipe(bufferContent)
})
```
