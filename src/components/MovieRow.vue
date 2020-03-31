<template>
  <div class="container">
    <h3 class="row-title">{{ rowTitle }}</h3>
    <div class="movie-row">
      <MovieCard class="movie-box" v-for="movie in movies" :movie="movie" :key="movie.id" />
       </div>
  </div>
</template>


<script>
import MovieCard from './MovieCard'
export default {
  name: "MovieRow",
  components:{MovieCard},

  props: {
    rowTitle: String,
    movies: {}
  }
};
</script>


<style scoped>
.row-title {
  font-size: 1.3rem;
  margin-left: 1.5rem;
  margin-bottom: 0.7rem;
}
.container {
  padding-top: 1rem;
  margin: 2rem 0;
}

.movie-row {
  display: flex;
  padding: 1rem;
  width: 100%;
  overflow-y: hidden; /* Hide horizontal scrollbar */
  overflow-x: scroll; /* Add vertical scrollbar */
}

.movie-row > * {
  margin-left: 1.5rem;
}

.movie-row-wrapper > *:last-child {
  padding-right: 1.5rem;
}


</style>