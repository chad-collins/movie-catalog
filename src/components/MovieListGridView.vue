<template>
  <div class="grid">
    <div  v-for="movie in movies" :key="movie.id">
      <MovieCard class="item" :movie="movie" />
    </div>
  </div>
</template>


<script>
import MovieCard from "./MovieCard";
export default {
  components: { MovieCard },

  props: {
    movies: {}
  }
};
</script>


<style scoped>
.grid {
  background-color: red;
  display: grid;
  grid-template-columns: repeat(3, 200px);
}

.grid * > {
  margin: 1rem;
}

.item {
  margin: 3rem;
}

/deep/ img {
  width: 200px;
}
</style>