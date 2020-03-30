<template>
  <div id="app">
    <NavBar />
    <main>
      <router-view :key="$route.fullPath" />
    </main>
    <Footer />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    NavBar,
    Footer
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
a:active, a:focus {
  outline: 0;
  -moz-outline-style: none;
  outline-style: none;
}
body {
  font-family: "Roboto", sans-serif;
  line-height: 1.4;
  background-color: rgb(219, 219, 233);
}

main {
  margin-top: 4rem;
}
@media (min-width: 600px) {
  main {
    margin-left: 4rem;
    margin-top: 0;
  }
}
button {
  user-select: none;
}
</style>
