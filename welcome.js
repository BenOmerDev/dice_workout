firebase.auth().onAuthStateChanged(async 
   (user) {
    if (user) {
      let currentUserName = firebase.auth().currentUser.displayName
     // Signout button
     document.querySelector(".sign-in-or-sign-out").innerHTML = `
     <p class="font-bold text-xl">Signed in as ${currentUserName}</p>
     <a href="#" class="sign-out-button text-pink-500 underline">Sign Out</a>`
  
    document.querySelector(".sign-out-button").addEventListener("click", function(event){
      event.preventDefault()
      firebase.auth().signOut()
      document.location.href = "welcome.html"
    })
  
    let db = firebase.firestore()
    // let apiKey = 'your TMDB API key'
    let response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=50c8dfd7e15657ccc47bdce9a3ba60dc&language=en-US`)
    let json = await response.json()
    let options = json.results
    console.log(options)
  
    // options = options of subscriptions = movies in the movies hw
    for (let i=0; i<options.length; i++) {
      let option = options[i]
      let docRef = await db.collection('subscribed').doc(`${subscribe.id}-${firebase.auth().currentUser.uid}`).get()
      let subscribed = docRef.data()
      let opacityClass = ''
      if (subscribed) {
        opacityClass = 'opacity-20'
      }
  
      document.querySelector('.options').insertAdjacentHTML('beforeend', `
        <div class="w-1/5 p-4 option-${option.id} ${opacityClass}">
          <img src="https://image.tmdb.org/t/p/w500${option.backdrop_path}" class="w-full">
          <a href="#" class="subscribed-button block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">I've watched this!</a>
        </div>`)
  
      document.querySelector(`.option-${option.id}`).addEventListener('click', async function(event) {
        event.preventDefault()
        let optionElement = document.querySelector(`.option-${option.id}`)
        optionElement.classList.add('opacity-20')
        await db.collection('subscribed').doc(`${option.id}-${firebase.auth().currentUser.uid}`).set({
          userID: firebase.auth().currentUser.uid,
          optionID: option.id
        })
      }) 
    }
    } else {
      // Initializes FirebaseUI Auth
      let ui = new firebaseui.auth.AuthUI(firebase.auth())
      // FirebaseUI configuration
      let authUIConfig = {
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: 'welcome.html'
      }
      // Starts FirebaseUI Auth
      ui.start('.sign-in-or-sign-out', authUIConfig)
    }})
  
