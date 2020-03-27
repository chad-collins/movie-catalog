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
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
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
