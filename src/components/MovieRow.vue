<template>
  <div id="movie-row">
    <h2 class="row-title">{{ rowTitle }}</h2>
    <div class="flex">
      <MovieCard class="movie-card" v-for="movie in movies" :movie="movie" :key="movie.id" />
    </div>
  </div>
</template>


<script>
import MovieCard from "./MovieCard";
export default {
  name: "MovieRow",
  components: { MovieCard },

  props: {
    rowTitle: String,
    movies: {}
  }
};
</script>


<style scoped>
.row-title {
  padding: 0 5px 18px 5px;
}

.flex {
  display: flex;
  padding: 0 5px 30px 5px;
  overflow-y: hidden; /* Hide horizontal scrollbar */
  overflow-x: scroll; /* Add vertical scrollbar */
}

.movie-card {
  margin: 0 1rem;
}

.movie-card:first-child {
  margin: 0 1rem 0 0;
}

/deep/ .movie-card img {
  width: 36vw;
  max-width: 200px;
}
</style>