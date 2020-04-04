import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTh, faList, faLink, faHome, faInfo, faSearch, faWindowClose, faPlay, faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faVuejs } from '@fortawesome/free-brands-svg-icons'

library.add(faTh, faList, faLink, faHome, faInfo, faSearch, faWindowClose, faPlay, faCircle, faVuejs)
Vue.component('font-awesome-icon', FontAwesomeIcon)



Vue.config.productionTip = false;

Vue.filter("formatImageLink", function (value) {
  return value == undefined
    ? "https://via.placeholder.com/185x278/000000/FFFFFF/?text=No%20Image%20Found"
    : "https://image.tmdb.org/t/p/w300" + value;
});

Vue.filter("dollars", function (value) {
  return value > 0
    ? "$" + value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    : "Unknown";
});

Vue.filter("rating", function (value) {
  const rating = value / 2;
  const black = "\u2605";
  const white = "\u2606";
  let stars = [];

  for (let x = 1; x <= 5; x++) {
    x <= Math.ceil(rating) ? stars.push(black) : stars.push(white);
  }

  return stars.join("");
});

Vue.filter("date", function (value) {
  (value == null) ? value = '0000-00-00' : value;
  const year = value.slice(0, 4);
  const monthNum = Number(value.slice(5, 7));
  const day = value.slice(8, 10);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  return months[ monthNum - 1 ] + " " + day + ", " + year;
});

Vue.filter("year", function (value) {
  return value ? value.slice(0, 4) : "unknown";
});

Vue.filter("minutesToHours", function (value) {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  return value == null
    ? "unknown"
    : hours.toString() + " hr " + minutes.toString() + " min";
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
