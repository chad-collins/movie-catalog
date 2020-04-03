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
import NavBar from "./components/TheNavBar";
import Footer from "./components/TheFooter";

export default {
  name: "App",
  components: {
    NavBar,
    Footer
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,600;0,700;1,400&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
a:active,
a:focus {
  outline: 0;
  -moz-outline-style: none;
  outline-style: none;
}
body {
  font-family: "Archivo", sans-serif;
  line-height: 1.4;
  background-color: rgb(240, 237, 243);
}

main {
  margin-top: 60px;
}
@media (min-width: 600px) {

}
button {
  user-select: none;
}
button:hover {
  cursor: pointer;
}


</style>
