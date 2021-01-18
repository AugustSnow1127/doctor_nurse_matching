import * as fb from '@/firebase'
// import router from '@/router/index'

export default {
  namespaced: true,
  state: {
    userProfile: {}
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
      console.log("state.userProfile: " + state.userProfile)
    }
  },
  actions: {
    async login({ dispatch }, form) {
      // sign user in
      await fb.auth.signInWithEmailAndPassword(form.email, form.password)
      .then((credential)=> {
        alert('登入成功!');
        // fetch user profile and set in state
        dispatch('fetchUserProfile', credential.user)
      }).catch(err => {
        var errorCode = err.code;
        var errorMessage = err.message;
        if (errorCode === 'auth/user-disabled') {
          alert('您輸入的信箱已被停用');
        }else if (errorCode === 'auth/invalid-email') {
          alert('您輸入的信箱格式錯誤');
        }else if (errorCode === 'auth/user-not-found') {
          alert('您輸入的信箱尚未註冊');
        }else if (errorCode === 'auth/wrong-password') {
          alert('您輸入的密碼錯誤');
        }else { //
          alert(errorMessage);
        }
        console.log(err);
      })
    },
    async signup({ dispatch }, form) {
      // sign user up
      await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
      .then(credential=> {
        alert('註冊成功!');
        // create user profile object in userCollections
        fb.usersCollection.doc(credential.user.uid).set({
          id: credential.user.uid,
          name: form.name,
          jobTitle: form.jobTitle,
          right: false
        }).then(()=> {
          // fetch user profile and set in state
          dispatch('fetchUserProfile', credential.user)
        }).catch(err => {
          console.log(err);
        })
      }).catch(err => {
        var errorCode = err.code;
        var errorMessage = err.message;
        if (errorCode === 'auth/email-already-in-use') {
          alert('您輸入的信箱已被註冊');
        }else if (errorCode === 'auth/invalid-email') {
          alert('您輸入的信箱格式錯誤');
        }else if (errorCode === 'auth/operation-not-allowed') {
          alert('此平台尚未開放使用信箱註冊');
        }else if (errorCode === 'auth/weak-password') {
          alert('您輸入的密碼需要大於5個字');
        }else { //
          alert(errorMessage);
        }
        console.log(err);
      })
    },
    async logout({ commit }) {
      await fb.auth.signOut()
    
      commit('setUserProfile', {})
      // router.push('/')
    },
    async fetchUserProfile({ commit }, user) {
      const userProfile = await fb.usersCollection.doc(user.uid).get()
      commit('setUserProfile', userProfile.data())

      // if (router.currentRoute.path === '/login') {
        // router.push('/')
      // }
      // if (router.currentRoute.path === '/signup') {
      //   router.push('/login')
      // }
    },
  }
}