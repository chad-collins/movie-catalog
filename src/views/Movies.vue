<template>
  <div>
    <form>
      <label for="genre-list">Genres:</label>
      <select id="genre-list" name="genre-list">
        <option
          v-on:click="selectedGenre = genre.id, runSearch()"
          v-for="genre in genreList"
          v-bind:key="genre.id"
          v-bind:value="genre.id.toString()"
        >{{ genre.name }}</option>
      </select>

      <label for="sort">Sort By:</label>
      <select id="sort" name="sort">
        <option
          v-on:click="sort = sortOption, runSearch()"
          v-for="sortOption in sortOptions"
          v-bind:key="sortOption"
          v-bind:value="sortOption"
        >{{ sortOption }}</option>
      </select>
    </form>
    <div>
      <button v-on:click="currentPage -= 1, runSearch()">page back</button>
      <button v-on:click="currentPage += 1, runSearch()">page forward</button>
      <div>total results:{{totalResults}}</div>
      <div>current page:{{currentPage}}</div>

      <table style="width:100%">
        <tr>
          <th>Vote Average</th>
          <th>Title</th>
          <th>Release Date</th>
        </tr>
        <tr v-for="movie in movies" v-bind:key="movie.id">
          <td>{{movie.vote_average}}</td>
          <td>{{movie.title}}</td>
          <td>{{movie.release_date}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { RepositoryFactory } from "../services/RepositoryFactory.js";
const MoviesRepository = RepositoryFactory.get("movies");
export default {
  name: "movies",
  components: {},
  data() {
    return {
      genreList: [],
      selectedGenre: "",
      sort: "popularity.desc",
      totalPages: 1,
      totalResults: 0,
      currentPage: 1,
      movies: [],
      sortOptions: [
        "popularity.desc",
        "popularity.asc",
        "release_date.asc",
        "release_date.desc",
        "revenue.asc",
        "revenue.desc",
        "primary_release_date.asc",
        "primary_release_date.desc",
        "original_title.asc",
        "original_title.desc",
        "vote_average.asc&vote_count.gte=100",
        "vote_average.desc&vote_count.gte=100",
        "vote_count.asc",
        "vote_count.desc"
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
    async runSearch() {
        
 
      const { data } = await MoviesRepository.getMovies(
        this.sort,
        this.selectedGenre,
        this.currentPage
      );
      this.totalPages = data.total_pages;
      this.movies = data.results;
      this.totalResults = data.total_results;
      this.currentPage = data.page;
    
      }
  }
};
</script>

<style scoped>
#sort,
#genre-list {
  background-color: black;
}

button {
  color: black;
}

th {
  text-align: left;
}
td {
  padding: 1rem 0.5rem;
}
</style>


, , , , , , , , , , , , , 
default: 