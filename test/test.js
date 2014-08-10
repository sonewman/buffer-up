var describe = require('macchiato')
var BufferUp = require('../')

describe('BufferUp!', function () {
  
  beforeEach(function () {
    this.dataString = [
      'this '
      , 'is '
      , 'a test '
      , 'string.'
    ]

    this.jsonString = [
      '{"a":true,'
      , '"b": false,'
      , '"c": true,'
      , '"d": false}'
    ]

    this.expectedObj = {
      a: true
      , b: false
      , c: true
      , d: false
    }
  })

  it('Should buffer up the data and return in callback', function (test) {
    var bufferUp = new BufferUp(function (err, data) {
      test.equals(data, test.dataString.join(''))
      test.end()
    })

    this.dataString.forEach(function (text) {
      bufferUp.write(text)
    })

    bufferUp.end()
  })

  it('Should buffer a JSON string and return an object', function (test) {
    var bufferUp = BufferUp(function (err, data) {
      test.deepEquals(data, test.expectedObj)
      test.end()
    })

    this.jsonString.forEach(function (text) {
      bufferUp.write(text)
    })

    bufferUp.end()
  })

})

