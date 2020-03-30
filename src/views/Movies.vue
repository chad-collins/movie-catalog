<template>
  <div>
    <form>
      <label for="genre-list">Genres:</label>
      <select id="genre-list" name="genre-list">
        <option v-on:click="selectedGenre = 'all', runSearch()" value="all">All</option>
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
      <div v-if="totalPages > 1" class="results--nav">
        <button v-on:click="changePage('prev')">page back</button>
        
        <div
          class="results--page-number"
          v-on:click="changePage(page.number)"
          v-for="page in pageLabels"
          v-bind="page"
          :key="page.number"
          v-bind:class="{ active: currentPage == page.number }"
        >{{ page.number }}</div>

        <button v-on:click="changePage('next')">page forward</button>
      </div>

      <div>total results:{{totalResults}}</div>

      <table style="width:100%">
        <tr>
          <th>Vote Average</th>
          <th></th>
          <th>Title</th>
          <th>Year</th>
        </tr>
        <tr v-for="movie in movies" v-bind:key="movie.id">
          <td>{{movie.vote_average}}</td>
          <td>
            <img width="50" :src="movie.poster_path | formatImageLink" alt />
          </td>
          <td>
            <router-link
              :to="{ 
            name: 'movie', 
            params: { 
                id: movie.id,
            } 
        }"
            >{{movie.title}}</router-link>
          </td>
          <td>{{movie.release_date | year}}</td>
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
    this.runSearch();
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
    },

    changePage(destination) {
      if (destination == "prev") {
        this.currentPage > 1
          ? (this.currentPage -= 1)
          : (this.currentPage += 0);
      } else if (destination == "next") {
        this.currentPage < this.totalPages
          ? (this.currentPage += 1)
          : (this.currentPage += 0);
      } else this.currentPage = destination;

      this.runSearch();
    }
  },
  computed: {
    pageLabels() {
      let pages = [];
      for (let x = 0; x < this.totalPages; x++) {
        let number = { number: x + 1 };
        pages.push(number);
      }
      return pages;
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
  padding: 1rem;
  background-color: purple;
}

tr:nth-child(even) {
  background-color: #0e0e11;
}

.active {
  color: yellow;
}

.results--nav {
  display: flex;
}

.results--page-number{
  margin: 0 0.5rem;
  font-size: 1.2rem;
}

.results--page-number:hover{
  cursor: pointer;
}
</style>


, , , , , , , , , , , , , 
default: 