import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

module.exports = {
  build: {
    assetsPublicPath: '/'
  }
}

new Vue({
  render: h => h(App),
}).$mount('#app')
