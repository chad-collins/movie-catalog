<template>
  <div id="movie-list">
    <div class="sort-buttons-row">
      <div class="row-left">
        <div
          class="sort-button"
          v-for="option in sortOptions"
          :key="option.key"
          v-on:click="sortList(option.key)"
        >
          <div>{{ option.value }}</div>
          <div v-if="sortedBy.includes(option.key)">{{ arrow }}</div>
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

    <!-- <div class="department-row">
      <button>{{department}}</button>
      <div v-for="department in departments" :key="department">
        <div v-on:click="updateActiveList(department)">{{department}}</div>
      </div>
    </div>-->

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
  props: { movies: Array, defaultView: String },
  data() {
    return {
      totalResults: this.movies.length,
      listView: this.defaultView,
      genreList: [],
      sortedBy: "",
      sortedDescending: true,
      arrow: "\u2193",
      sortOptions: [
        { key: "title", value: "Title" },
        { key: "release_date", value: "Year" },
        { key: "vote_average", value: "Avg Score" },
        { key: "popularity", value: "Popularity" }
      ]
    };
  },

  created() {
    this.fetch();
  },

  watch: {
    sortedDescending: function(val) {
      val ? (this.arrow = "\u2193") : (this.arrow = "\u2191");
    }
  },
  methods: {
    async fetch() {
      const id = this.$route.params.id;
      {
        const { data } = await MoviesRepository.getGenres(id);
        this.genreList = data.genres;
      }
    },
    sortList(val) {
      if (val === this.sortedBy) {
        this.sortedDescending = !this.sortedDescending;
        this.movies.reverse();
      } else {
        this.sortedBy = val;
        this.sortedDescending = true;
        val == "title"
          ? this.movies.sort((a, b) =>
              a[this.sortedBy] > b[this.sortedBy] ? 1 : -1
            )
          : this.movies.sort((a, b) =>
              a[this.sortedBy] > b[this.sortedBy] ? -1 : 1
            );
      }
    }
  }
};
</script>

<style scoped>

.movie-list{
  max-width: 100%;
}
.active {
  color: yellow !important;
}
.active:hover {
  cursor: default;
}

.sort-buttons-row,
.department-row {
  width: 100%;
  background: linear-gradient(
    0deg,
    rgba(99, 82, 161, 1) 0%,
    rgba(133, 111, 214, 1) 50%
  );
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sort-buttons-row {
  border-radius: 15px 15px 0 0;
  user-select: none;
}



.sort-button {
  color: white;
  display: flex;
  justify-content: space-between;
  max-width: 140px;
  width: 100%;
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
  font-size: 1.2rem;
}

@media (max-width: 699px) {
.sort-button {
    font-size: 0.8rem;
  }
}
</style>