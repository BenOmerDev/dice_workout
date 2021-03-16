let firebase = require('./firebase')
exports.handler = async function(event) {
  let queryStringuserId = event.queryStringParameters.userId
  let subsdata = []
  let db = firebase.firestore()
  let querySnapshot = await db.collection('subscriptions').where('userId', '==', queryStringuserId).get()
    let subs = querySnapshot.docs
    for (let i=0; i<subs.length; i++) {
      let subId = subs[i].id
      let sub = subs[i].data()
      subsdata.push({
        id : subId,
        subDate : sub.date,
        subPrice : sub.price,
        subService : sub.service,
        subUid : sub.userId
      })
    }
  return {
    statusCode: 200,
    body: JSON.stringify(subsdata)
  }
}