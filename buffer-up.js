var Writable = require('stream').Writable
var inherits = require('util').inherits

function BufferUp(options, callback) {
  if (!(this instanceof BufferUp))
    return new BufferUp(options, callback)
  
  var self = this
  var couldBeJson = /^\s*[\[\{]/

  if ('function' === typeof options) {
    callback = options
    options = {}
  }

  self._buffer = ''
  Writable.call(self, options)
  
  self.on('error', function (err) {
    callback(err)
  })

  self.on('finish', function onEnd() {
    var buffered = self._buffer

    if (couldBeJson.test(buffered)) {
      try {
        buffered = JSON.parse(buffered)
      } catch (err) {}
    }
    callback(null, buffered)
  })
}

inherits(BufferUp, Writable)

module.exports = BufferUp

BufferUp.prototype._write = function (data, enc, next) {
  this._buffer += data
  next()
}