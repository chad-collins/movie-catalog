<template>
  <div>
    <div class="navbar">
      <nav>
        <div>
          <router-link to="/">
            <img height="30px" src="../assets/images/logo.png" alt="logo" />
          </router-link>
        </div>
        <div>
          <div v-on:mouseover="showingMovies = true" v-on:mouseleave="showingMovies = false"><button>Movies</button>
          <ul
            v-if="showingMovies"
            class="drop-down-menu"
          >
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

        <div>
          <router-link to="/"><button>People</button></router-link>
        </div>
        <div>
          <font-awesome-icon
            v-on:click="showingSearch = !showingSearch"
            :class="{'yellow' : showingSearch}"
            class="search-button"
            icon="search"
          />
        </div>
        <div>
          <router-link to="/about">
            <button><font-awesome-icon icon="info" /></button>
          </router-link>
        </div>
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
.branding {
  border: 1px solid white;

  border-radius: 20px;
}
.navbar {
  background: linear-gradient(
    0deg,
    rgba(99, 82, 161, 1) 0%,
    rgb(104, 87, 167) 90%
  );
  align-items: center;
  display: flex;
  height: 60px;
  justify-content: space-between;
  top: 0;
  position: fixed;
  width: 100vw;
  z-index: 500;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.3);
}

nav {
  display: flex;
  width: 100%;
  flex-direction: inherit;
  list-style: none;
  justify-content: space-evenly;
  align-items: center;
}

a {
  text-decoration: none;
  color: black;
  font-weight: bolder;
}

.search-button {
  color: white;
  cursor: pointer;
  font-size: 1.3rem;
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

button{
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  height: 65px;
  padding: 1rem;
}

</style>
