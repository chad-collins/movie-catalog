<template>
  <div class="row-container">
    <h3 class="row-title">{{ rowTitle }}</h3>
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
          
          <img :src="movie.poster_path | formatImageLink" />
        </router-link>
        <h4>{{ movie.title.substring(0, 40)}} <span v-if="movie.title.length > 41">...</span>
        </h4>
        <p v-if="movie.character != null">{{ movie.character }}</p>
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
  color: white;
  font-size: 1.3rem;
  margin-left: 1.5rem;
  margin-bottom: 0.7rem;
}
.row-container {
  box-shadow: inset 0 2px 25px #000000;
  padding-top: 1rem;
  margin: 2rem 0;
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
  height: 15vw;
  width: auto;
  margin: 0.1rem;
  transition: all 0.1s ease-in-out;
}

img:hover {
  transform: scale(1.03);
}
</style>