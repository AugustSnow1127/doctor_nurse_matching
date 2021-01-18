import { createStore } from 'vuex'
import mLogin from './modules/mLogin'
import mStatus from './modules/mStatus'

export default createStore({
  modules: {
    mLogin,
    mStatus,
  }
})
