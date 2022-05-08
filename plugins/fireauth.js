import { auth } from '~/plugins/firebase.js'

export default (context) => {
  const { store } = context;

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        auth.currentUser.getIdTokenResult().then(idTokenResult => {
          if (idTokenResult.claims.admin) {
            console.log("Admin user")
            store.commit('setAdmin', true);
          }

          let data;

          if (user.email) {
            data = {
              uid: user.uid,
              email: user.providerData[0].email,
              displayName: user.providerData[0].displayName,
              photoURL: user.providerData[0].photoURL,
              admin: idTokenResult.claims.admin || false
            }
          } else {
            data = {
              uid: user.uid,
              email: user.providerData[0].email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              admin: idTokenResult.claims.admin || false
            }
            
          }


          // console.log("user", user)
          store.commit('setUser', data);
        });
        resolve(user)
      } else {
        store.commit('setAdmin', false);
        store.commit('setUser', null)
        resolve(null)
      }
    })
  })
}