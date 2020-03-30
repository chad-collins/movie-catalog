import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

Vue.filter("formatImageLink", function(value) {
  return value == null
    ? "https://via.placeholder.com/370x556/000000/FFFFFF/?text=No%20Image%20Found"
    : "https://image.tmdb.org/t/p/w185" + value;
});

Vue.filter("dollars", function(value) {
  return (value > 0) ? "$" + value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") : "Unknown";
});

Vue.filter("date", function(value) {
  const year = value.slice(0, 4);
  const monthNum = value.slice(5, 7);
  const day = value.slice(8, 10);

  const getMonth = num => {
    return num == 1
      ? "January"
      : num == 2
      ? "February"
      : num == 3
      ? "March"
      : num == 4
      ? "April"
      : num == 5
      ? "May"
      : num == 6
      ? "June"
      : num == 7
      ? "July"
      : num == 8
      ? "August"
      : num == 9
      ? "September"
      : num == 10
      ? "October"
      : num == 11
      ? "November"
      : "December";
  };

  return getMonth(monthNum) + " " + day + ", " + year;
});

Vue.filter("year", function(value) {
  return value.slice(0, 4);
});

Vue.filter("minutesToHours", function(value) {
  const hours = Math.floor(value / 60)
  const minutes = (value % 60)
  return (value == null) ? "unknown" : hours.toString() + " hr " + minutes.toString() + " min";
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
