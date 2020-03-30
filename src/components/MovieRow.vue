<template>
  <div class="container">
    <h3 class="row-title">{{ rowTitle }}</h3>
    <div class="movie-row">
      <div class="movie-box" v-for="movie in movies" :key="movie.id">
        <router-link
          :to="{ 
            name: 'movie', 
            params: { 
                id: movie.id,
            } 
        }"
        >
          <img :src="movie.poster_path | formatImageLink" />
        </router-link>
        <div class="movie-info">
          <div class="movie-title">
            {{ movie.title.substring(0, 40)}}
            <span v-if="movie.title.length > 41">...</span>
          </div>
          <div v-if="movie.character != null">{{ movie.character }}</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "MovieRow",

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

img {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.1);
}
.movie-info {
  padding: 0.5rem;
}

.movie-title {
  font-weight: bold;
}
</style>