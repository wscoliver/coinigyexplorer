/*
  Main App
*/


import Datastore from 'nedb'
import Bluebird from 'bluebird'
import co from 'co'
import socketCluster from 'socketcluster-client'
import { topics } from '../products'
import Rx from 'rx'
// bluebird
Bluebird.promisifyAll(Datastore.prototype)

const opts = {
  hostname: 'sc-02.coinigy.com',
  port: '443',
  secure: 'true'
}

const dataConnect = function(apiCredentials, socketPipe) {
  const SCsocket = socketCluster.connect(opts)

  SCsocket.on('connect', (status) => {
    SCsocket.emit('auth', apiCredentials, (err, token) => {
      if(!err && token) {

      }
      topics.forEach((topic) => {
        const chan = SCsocket.subscribe(topic)
        chan.watch((mesg) => {
          const payload = {
            topic,
            mesg
          }
          socketPipe.onNext(payload)
        })
      })
    })
  })
}
const run = function(apiCredentials, dataPipe) {
  const socketPipe = new Rx.Subject()
  dataConnect(apiCredentials, socketPipe)
  socketPipe.subscribe((incoming) => {
    dataPipe.onNext(incoming)
  })
}
export default {
  dataConnect,
  run
}
