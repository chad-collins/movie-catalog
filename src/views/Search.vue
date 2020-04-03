<template>
  <div class="container">
    <div class="search-header">
      <div class="searchbar-wrapper">
        <div class="icon-wrapper">

        </div>
        <input
          id="search"
          type="text"
          placeholder="Movie Title or Actor Name"
          v-model="query"
          v-on:input="runSearch(query)"
          v-on:delete="runSearch(query)"
        />
        <h3 v-if="query.length >=2">Results for: "{{ query }}"</h3>
      </div>
    </div>

    <MovieRow v-if="movies.length > 0" rowTitle="Movie Results:" v-bind:movies="movies" />
    <PersonRow v-if="actors.length > 0" rowTitle="Actor Results:" v-bind:people="actors" />
  </div>
</template>

<script>
import { RepositoryFactory } from "../services/RepositoryFactory.js";
import MovieRow from "../components/MovieRow.vue";
import PersonRow from "../components/PersonRow";
const MoviesRepository = RepositoryFactory.get("movies");
const ActorsRepository = RepositoryFactory.get("actors");

export default {
  name: "search",
  components: {
    MovieRow,
    PersonRow
  },
  data() {
    return {
      query: "",
      movies: [],
      actors: []
    };
  },
  methods: {
    async runSearch() {
      if (this.query.length > 2) {
        {
          const { data } = await MoviesRepository.getByName(this.query);
          this.movies = data.results;
        }
        {
          const { data } = await ActorsRepository.getByName(this.query);
          this.actors = data.results;
        }
      } else {
        this.movies = [];
        this.actors = [];
      }
    }
  }
};
</script>

<style scoped>
h3 {
  color: white;
  padding: 2rem;
  text-align: center;
}
.movie {
  margin: 0.3rem;
}

.search-header {
  display: flex;
  justify-content: center;
  padding: 3rem;
  align-items: center;
}
.searchbar-wrapper {
  padding: 0 0.8rem;
  display: grid;
  border-radius: 4px;
  background-color: rgb(61, 60, 68);
  height: 50px;
  width: 90vw;
}
input {
  color: white;
  height: inherit;
  padding: 0 2rem;
  grid-column-start: 1;
  grid-column-end: -1;
  grid-row-start: 1;
  grid-row-end: -1;
  z-index: 34;
  background: none;
  border: none;
}

.icon-wrapper {
  display: flex;
  height: inherit;
  align-items: center;
  grid-column-start: 1;
  grid-column-end: -1;
  grid-row-start: 1;
  grid-row-end: -1;
  z-index: 34;
}
.material-icons {
  color: white;
}

.list {
  display: flex;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
