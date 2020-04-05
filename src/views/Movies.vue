<template>
  <div id="movies-page">
    <div class="hero">{{ bannerTitle }}</div>

    <MovieList
      v-bind:movies="movies"
      defaultView="grid"
      @addPage="additionalPage()"
      :key="componentKey"
    />
  </div>
</template>

<script>
import MovieList from "../components/MovieList";
import { RepositoryFactory } from "../services/RepositoryFactory.js";
const moviesRepository = RepositoryFactory.get("movies");

export default {
  name: "movies",
  components: { MovieList },
  data() {
    return {
      componentKey: 0,
      pagesLoaded: 1,
      movies: {},
      bannerTitle: this.$route.params.category.display
    };
  },
  created() {
    this.fetch();
  },

  methods: {
    async fetch() {
      const id = this.$route.params.id;

      const { data } = await moviesRepository.getByCategory(id, 1);
      this.movies = data.results;
    },

    async additionalPage() {
      const id = this.$route.params.id;
      this.pagesLoaded = this.pagesLoaded += 1;
      const { data } = await moviesRepository.getByCategory(
        id,
        this.pagesLoaded
      );
      this.movies.push(
        data.results.forEach(element => {
          this.movies.push(element);
        })
      );
      this.forceRerender();
    },
    forceRerender() {
      this.componentKey += 1;
    }
  }
};
</script>

<style>
.hero {
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 3rem;
  align-items: center;
  height: 300px;
  max-height: 20vh;
}
</style>