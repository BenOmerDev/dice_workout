firebase.auth().onAuthStateChanged(async function(user) {
  let db = firebase.firestore()
  console.log(db)
  if (user) {
    // Signed in
    console.log('signed in')
    db.collection('users').doc(user.uid).set({
      email: user.email,
      name: user.displayName
    })
    
    // 👇Beggining of Dashboard Body Content👇.
    document.querySelector('.subscriptions').insertAdjacentHTML('beforeend',`
        <div class="mt-8 mb-2 mx-16 px-8 py-4 text-4xl text-green-600 font-bold text-center border-8 rounded-full border-gray-600">
            <h1>Subscription Tracker</h1>`)
    document.querySelector('.subscriptions').insertAdjacentHTML('beforeend',`
      <div class=" mx-8   flex text-4xl text-center">
          <div class="w-1/3 px-2 py-4">
              ☁
          </div>
          <div class="w-1/3 px-2 py-4">
              📅
          </div>
          <div class="w-1/3 px-2 py-4">
              💲
          </div>
      </div>`)

    let querySnapshot = await db.collection('subscriptions').get()
    console.log(`Number of subscriptions in collection: ${querySnapshot.size}`)
    let subs = querySnapshot.docs
    console.log(subs)
    for (let i=0; i<subs.length; i++) {
      let subId = subs[i].id
      let sub = subs[i].data()
      let subDate = sub.date
      let subPrice = sub.price
      let subService = sub.service
      let subUid = sub.userId
      
      document.querySelector('.subscriptions').insertAdjacentHTML('beforeend', `
        <div class="mx-8 flex">
          <div class="w-1/3 mt-4 mb-2 px-8 text-center py-4 text-2xl text-black-600 
          font-bold border-8 rounded-l-full border-green-600">${subService}</div>
          <div class="w-1/3 mt-4 mb-2 px-8 text-center py-4 text-2xl text-black-600 
          font-bold border-8 border-green-600">${subDate}</div>
          <div class="w-1/3 mt-4 mb-2 px-8 text-center py-4 text-2xl text-black-600 
          font-bold border-8 rounded-r-full border-green-600">${subPrice}</div>
        </div>`)
      // Sign out button
      document.querySelector('.sign-in-or-sign-out').innerHTML = `
        <div class="text-white-500">Signed in as ${user.displayName}</div>
        <button class="text-pink-500 underline sign-out">Sign Out</button>`
      // Signs out if 
      document.querySelector('.sign-out').addEventListener('click', function(event) {
        console.log('sign out clicked')
        firebase.auth().signOut()
        document.location.href = 'index.html'
      })
    }
  }
  else {
    // Signed out
    console.log('signed out')
    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())
    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: 'index.html'
    }
    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }
})