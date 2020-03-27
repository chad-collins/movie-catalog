<template>
  <div class="row-container">
    <h3 class="row-title">{{ categoryName }}</h3>
    <div class="movie-row-wrapper">
      <Movie v-bind:movie="movie" v-bind:key="movie.id" v-for="movie in movies"/>
    </div>
  </div>
</template>


<script>
import Movie from "./Movie.vue";

export default {
  name: "MovieRow",
  components: { Movie },

  props: {
    categoryName: String,
    movies: {}
  }
};
</script>


<style scoped>
.row-title {
  color: white;
  font-size: 1.3rem;
  margin-left: 1.5rem;
  margin-bottom: 0.7rem;
}

.movie-row-wrapper {
  display: flex;
  width: 100%;
  overflow-y: hidden; /* Hide horizontal scrollbar */
  overflow-x: scroll; /* Add vertical scrollbar */
}

.movie-row-wrapper > * {
  margin-left: 1.5rem;
}

.movie-row-wrapper > *:last-child {
  padding-right: 1.5rem;
}
</style>