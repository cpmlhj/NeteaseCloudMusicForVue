var express= require('express')
var config = require('./config/index')

const app = express()

app.use(express.static('./dist'))
var port = process.env.PORT || config.dev.port

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('listen at http://localhost:' + port + '\n')
})

