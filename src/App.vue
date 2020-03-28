<template>
  <div id="app">
    <NavBar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  name: "App",
  components: {
    NavBar
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
* {
  color: white;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Roboto", sans-serif;
  line-height: 1.4;
  background-color: rgb(21, 21, 24);
}

main {
  margin-top: 4rem;
}
@media (min-width: 600px) {
  main {
    margin-left: 4rem;
    margin-top: 0;
  }}
</style>
