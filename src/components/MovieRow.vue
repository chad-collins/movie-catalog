<template>
  <div class="row-container">
    <h3 class="row-title">{{ categoryName }}</h3>
    <div class="movie-row-wrapper">
      <div v-for="movie in movies" :key="movie.id">
        <router-link
          :to="{ 
            name: 'movie', 
            params: { 
                id: movie.id,
            } 
        }"
        >
          <img v-if="movie.poster_path==null" src="https://www.fillmurray.com/g/370/556"/>
          <img v-else :src="'https://image.tmdb.org/t/p/w370_and_h556_bestv2//' + movie.poster_path" />
        </router-link>
        <h4>{{ movie.title }}</h4>
        <p v-if="movie.character != null">{{ movie.character }}</p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "MovieRow",

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

img {
  border-radius: 5px;
  height: 20vh;
  width: auto;
  margin: 0.1rem;
  transition: all 0.1s ease-in-out;
}

img:hover {
  transform: scale(1.03);
}
</style>