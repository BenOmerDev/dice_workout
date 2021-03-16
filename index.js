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

    let response = await fetch(`/.netlify/functions/subscriptions?userId=${user.uid}`)
    console.log(`user ID is ${user.uid}`)
    let subs = await response.json()
    console.log(subs)
    for (let i=0; i<subs.length; i++) {
      let subId = subs[i].id
      let sub = subs[i]
      let subDate = sub.subDate
      console.log(sub.date)
      let subPrice = sub.subPrice
      let subService = sub.subService
      let subUid = sub.subUid
      
      document.querySelector('.subscriptions').insertAdjacentHTML('beforeend', `
        <div class="mx-8 flex">
          <div class="w-1/3 mt-4 mb-2 px-8 py-2 border-8 rounded-l-full border-green-600">
            <img src="${subService}" class="h-12">
          </div>
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