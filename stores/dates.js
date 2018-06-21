var to = require('to2')
var pump = require('pump')
var hyperquest = require('hyperquest')
var JSONStream = require('JSONStream')
var chrono = require('chrono-node')
var strftime = require('strftime')

module.exports = store

function store (state, emitter) {
  emitter.on('DOMContentLoaded', function () {
    var dates = []

    var url = 'https://www.reddit.com/r/ethtrader/comments/8sn7ir/predict_the_exact_day_eth_will_reach_1000_again.json'

    pump(
      hyperquest(url),
      JSONStream.parse('1.data.children.*.data.body'),
      to(write, end),
      function (err) {
        if (err) console.error(err)
        state.date = err
        emitter.emit(state.events.RENDER)
      }
    )

    function write (buf, enc, next) {
      var body = buf.toString()
      var date = chrono.parseDate(body)
      if (date) {
        var guess = new Date(date)
        var today = new Date()
        if (guess.setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0)) {
          var timestamp = Date.parse(guess)
          if (timestamp > 0) dates.push(timestamp)
        }
      }
      next()
    }

    function end () {
      var total = dates.reduce(function (a, b) {
        return a + b
      }, 0)

      var avg = total / dates.length
      state.date = 'The average date guessed is ' + strftime('%B %d %Y', new Date(avg))
      emitter.emit(state.events.RENDER)
    }
  })
}
