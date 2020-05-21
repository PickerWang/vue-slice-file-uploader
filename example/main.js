import Vue from "vue";
import App from "./App.vue";
import SliceUploader from '../package/index'

Vue.use(SliceUploader)

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
