import moment from 'moment-timezone'

const clone = function(x) {
  return JSON.parse(JSON.stringify(x))
}
const stry = function(x) {
  return JSON.stringify(x)
}

const getDay = function() {
  let now = moment.utc()
  let tradingDT = now.tz('America/Chicago')
  if(tradingDT.hours() >= 17) {
    // Add One
    tradingDT.add(1,'day')
  }
  let output = tradingDT.format('YYYYMMDD')
  return output
}

export default {
  clone,
  stry,
  getDay
}
