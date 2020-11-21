import Vue from 'vue'
import App from './App.vue'
import VCalendar from 'v-calendar';

Vue.config.productionTip = false
Vue.use(VCalendar, {
  title: 'MMMM YYYY',
  weekdays: 'W',
  navMonths: 'MMM',
  input: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'],
  dayPopover: 'WWW, MMM D, YYYY',
  data: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'],
})

new Vue({
  render: h => h(App),
}).$mount('#app')
