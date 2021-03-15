firebase.auth().onAuthStateChanged(async function(user) {
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

   let querySnapshot = await db.collection('photos').get()
   console.log(`Number of photos in collection: ${querySnapshot.size}`)

   let photos = querySnapshot.docs
   console.log(photos)
   for (let i=0; i<photos.length; i++) {
     let photoId = photos[i].id
     let photo = photos[i].data()
     let photoService = photo.service
     let photoImage = photo.image
     console.log(photoImage)

     let docRef = await db.collection('selected').doc(`${photoId}-${firebase.auth().currentUser.uid}`).get()
     let selected = docRef.data()
     let opacityClass = ''
     if (selected) {
       opacityClass = 'opacity-20'
     }

     document.querySelector('.options').insertAdjacentHTML('beforeend',`
      <div class = "photo-${photoId} m-2 p-2 flex w-1/4 ${opacityClass}">
        <img src="${photoImage}">
      </div>`)
    
     document.querySelector(`.photo-${photoId}`).addEventListener('click', async function(event) {
       event.preventDefault()
       let optionElement = document.querySelector(`.photo-${photoId}`)
       optionElement.classList.add('opacity-20')
       await db.collection('selected').doc(`${photoId}-${firebase.auth().currentUser.uid}`).set({
         userID: currentUserName,
         photoID: photoImage
       })
        await db.collection('subscriptions').doc().set({
          date: 'tbd',
          price: 'tbd',
          service: photoImage,
          userId: 'tbd'
        })
    })
      } 
   }
   else {
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