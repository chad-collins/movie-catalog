<template>
  <div>
    <div class="navbar">
      <nav>
        <router-link to="/">
          <img class="branding" height="20px" src="../assets/images/logo.png" alt="logo" />
        </router-link>

        <div>
          <div v-on:mouseover="showingMovies = true" v-on:mouseleave="showingMovies = false">
            <button>Movies</button>
            <ul v-if="showingMovies" class="drop-down-menu">
              <li v-for="category in moviesCategories" :key="category" :category="category.keyword">
                <router-link
                  :to="{ 
            name: 'movies', 
            params: { 
                category: category,
                id: category.keyword
            } 
        }"
                >{{category.display}}</router-link>
              </li>
            </ul>
          </div>
        </div>

        <!-- <router-link to="/"><button>People</button></router-link> -->

        <button v-on:click="showingSearch = !showingSearch" :class="{'yellow' : showingSearch}">
          <font-awesome-icon class="search-button" icon="search" /> Search
        </button>


          <router-link to="/about">
            <button>About</button>
          </router-link>

        <div></div>
      </nav>
    </div>
    <TheNavbarSearch v-if="showingSearch" @close="showingSearch = false" />
  </div>
</template>



<script>
import TheNavbarSearch from "./TheNavbarSearch";
export default {
  components: { TheNavbarSearch },
  data() {
    return {
      showingSearch: false,
      showingMovies: false,
      moviesCategories: [
        { keyword: "now_playing", display: "Now Playing" },
        { keyword: "top_rated", display: "Top Rating" },
        { keyword: "popular", display: "Popular" },
        { keyword: "upcoming", display: "Upcoming" }
      ]
    };
  },
  watch: {
    $route: function(to, from) {
      if ((to, from)) {
        this.showingSearch = false;
        this.showingMovies = false;
      }
    }
  }
};
</script>

<style scoped>
.navbar {
  background: linear-gradient(
    0deg,
    rgba(99, 82, 161, 1) 0%,
    rgb(104, 87, 167) 90%
  );
  justify-content: center;
  display: flex;
  height: 60px;
  top: 0;
  position: fixed;
  width: 100vw;
  z-index: 500;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.3);
}

nav {
  display: flex;
  max-width: 700px;
  align-items: center;
  width: 100%;
  flex-direction: inherit;
  list-style: none;
  justify-content: space-evenly;
  align-items: center;
}

a {
  text-decoration: none;
  color: black;
}

.search-button {
  color: white;
  cursor: pointer;
}

.yellow {
  color: #ffd500;
}

li {
  list-style: none;
}
.drop-down-menu {
  position: fixed;
  top: 40px;
  background-color: white;
  padding: 1rem 2rem 1rem 0.6rem;
  border-radius: 10px;
  margin-top: 10px;
}

button {
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  height: 65px;
  padding: 1rem;
}
</style>
