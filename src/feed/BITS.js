import utils from '../lib/utils'

const processOrder = function(incoming, db) {
  const topic = incoming['topic']
  const mesg = incoming['mesg']
  const nowDay = utils.getDay()
  const collectionName = `${nowDay}:${topic}`
  const collection = db.collection(collectionName)
  const bidMap = {}
  const askMap = {}
  console.log(mesg.length)
  mesg.forEach((row) => {
    const px = Math.floor(row['price'] * 10)
    const orderSide = row['ordertype']
    const qty = Math.floor(row['quantity']* 10000)
    if( qty > 0 ) {

      if(orderSide == 'Sell') {
        if(bidMap.hasOwnProperty(px)) {
          const prevList = bidMap[px]
          prevList.unshift([px, qty])
        } else {
          bidMap[px] = [[px, qty]]
        }
      } else {
        console.log([px, qty])
        if(askMap.hasOwnProperty(px)) {
          const prevList = askMap[px]
          prevList.unshift([px, qty])
        } else {
          askMap[px] = [[px, qty]]
        }
      }
    }
  })
  console.log('bidMap')
  console.log(bidMap)
  console.log('askMap')
  console.log(askMap)
}
const processTrade = function(mesg, db) {
  console.log(mesg)
}
export default {
  processOrder,
  processTrade
}
