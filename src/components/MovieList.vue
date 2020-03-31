<template>
  <div>
        <div class="sort-buttons-row">
      <div class="row-left">
        <div
          class="sort-button"
          v-for="option in sortOptions"
          :key="option.key"
          v-on:click="sortList(option.key)"
        >
          <div>{{ option.value }}</div>
          <div v-if="sort.includes(option.key)">{{ arrow }}</div>
        </div>
      </div>
      <div class="row-right">
        <font-awesome-icon
          v-on:click="listView = 'details'"
          :class="{'active' : listView == 'details'}"
          class="display-button"
          icon="list"
        />
        <font-awesome-icon
          v-on:click="listView = 'grid'"
          :class="{'active' : listView == 'grid'}"
          class="display-button"
          icon="th"
        />
      </div>
    </div>
    <MovieListDetailview v-if="listView == 'details'" :movies="movies" />
    <MovieListGridView v-else :movies="movies" />
  </div>
</template>

<script>
import MovieListGridView from "./MovieListGridView";
import MovieListDetailview from "./MovieListDetailview";
import { RepositoryFactory } from "../services/RepositoryFactory.js";
const MoviesRepository = RepositoryFactory.get("movies");
export default {
  name: "list",
  components: { MovieListDetailview, MovieListGridView },
  props: { movies: Array },
  data() {
    return {
      listView: 'details',
      genreList: [],
      sort: "popularity",
      sortedDescending: true,
      sortOptions: [
        
        { key: "title", value: "Title" },
        { key: "release_date", value: "Year" },
        { key: "popularity", value: "Popularity" },
        { key: "vote_average", value: "Avg Score" },
      ]
    };
  },
  created() {
    this.fetch();
  },

  methods: {
    async fetch() {
      const id = this.$route.params.id;
      {
        const { data } = await MoviesRepository.getGenres(id);
        this.genreList = data.genres;
      }
    },

    sortList(property) {
      property === this.sort
        ? (this.sortedDescending = !this.sortedDescending)
        : (this.sortedDescending = true),
        (this.sort = property);

      this.sortedDescending == true
        ? this.movies.sort((a, b) => (a[property] > b[property] ? -1 : 1))
        : this.movies.sort((a, b) => (a[property] > b[property] ? 1 : -1));
    }
  },
  computed: {
    totalResults() {
      return this.movies.length;
    },

    arrow() {
      return this.sortedDescending == true ? "\u2193" : "\u2191";
    }
  }
};
</script>

<style scoped>
.active {
  color: yellow !important;
}
.active:hover {
  cursor: default;
}

.sort-buttons-row {
  border-radius: 15px;
  background: linear-gradient(
    0deg,
    rgba(99, 82, 161, 1) 0%,
    rgba(133, 111, 214, 1) 50%
  );
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sort-button {
  color: white;
  display: flex;
  justify-content: space-between;
  width: 140px;
  max-width: 100%;
  font-weight: bolder;
  border-right: 1px solid rgba(227, 227, 240, 0.3);
  padding: 1rem;
}

.sort-button:hover,
.display-button:hover {
  cursor: pointer;
}

.row-left,
.row-right {
  display: flex;
}
.display-button {
  margin: 1rem;
  color: rgb(216, 216, 216);
  font-size: 1.4rem;
}
</style>


, , , , , , , , , , , , , 
default: 