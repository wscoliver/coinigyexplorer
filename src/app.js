/*
  Main App
*/

import minimist from 'minimist'
import dotenv from 'dotenv'
import Datastore from 'nedb'
import Bluebird from 'bluebird'
import co from 'co'
import socketCluster from 'socketcluster-client'
import coinigy from './connectors/coinigy'
import Rx from 'rx'
import mongodb from 'mongodb'
// bluebird
Bluebird.promisifyAll(Datastore.prototype)
Bluebird.promisifyAll(mongodb.MongoClient)
// Internal Libraries
import BITS from './feed/BITS'
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
// Grab all events and pass to Rx Subject.
co(function* () {
  const MongoClient = mongodb.MongoClient
  const url = 'mongodb://localhost:27017/coinigy'
  const db = yield MongoClient.connectAsync(url)
  const subj = new Rx.Subject()
  coinigy.run(apiCredentials, subj)

  subj.subscribe((incoming) => {
    if(incoming['topic'] == 'ORDER-BITS--USD--BTC') {
      BITS['processOrder'](incoming, db)
    }
  })

})
