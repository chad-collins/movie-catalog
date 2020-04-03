<template>
  <div id="grid-container">
    <div class="grid">
      <MovieCard class="item" v-for="movie in movies" :key="movie.id" :movie="movie" />
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
#grid-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.grid {
  background-color: rgba(157, 168, 184, 0.2);
 -webkit-box-shadow: inset 0px 20px 29px -19px rgba(59,59,59,0.34);
-moz-box-shadow: inset 0px 20px 29px -19px rgba(59,59,59,0.34);
box-shadow: inset 0px 20px 29px -19px rgba(59,59,59,0.34);
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
}

.item {
  margin: 20px;
}

/deep/ img {
  width: 200px;
}
</style>