/*
  Main App
*/

import minimist from 'minimist'
import dotenv from 'dotenv'
import Datastore from 'nedb'
import Bluebird from 'bluebird'
import co from 'co'
import socketCluster from 'socketcluster-client'
// bluebird
Bluebird.promisifyAll(Datastore.prototype)
// Process Arguments
const rargs = process.argv.slice(2)
const argv = minimist(rargs)
const configPath = argv['config']
dotenv.config({ path: configPath })
const penv = process.env

const apiCredentials = {
  'apiKey': penv['X_API_KEY'],
  'apiSecret': penv['X_API_SECRET']
}

const opts = {
  hostname: 'sc-02.coinigy.com',
  port: '443',
  secure: 'true'
}
const SCsocket = socketCluster.connect(opts)

SCsocket.on('connect', (status) => {
  console.log(`SCsocket status:`)
  console.log(status)
  SCsocket.emit('auth', apiCredentials, (err, token) => {
    if(!err && token) {
      console.log(`Auth successful with token`)
      console.log(token)
    }
    // Subscribe
    //const bitfinexTrade = 'TRADE-BITS--USD--BTC'
    const bitfinexOrder = 'TRADE-BITS--USD--BTC'
    const gdaxOrder = 'TRADE-GDAX--BTC--USD'

    const bitfinexOrderChan = SCsocket.subscribe(bitfinexOrder)
    const gdaxOrderChan = SCsocket.subscribe(gdaxOrder)

    bitfinexOrderChan.watch((bitfinexData) => {
      console.log('Bitfinex Order')
      console.log(bitfinexData.length)
      console.log(bitfinexData)
    })
    gdaxOrderChan.watch((gdaxData) => {
      console.log('Gdax Order')
      console.log(gdaxData.length)
      console.log(gdaxData)
    })
    //
  })
})
