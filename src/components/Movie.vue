<template>
<div>
    <router-link
      :to="{ 
            name: 'MovieView', 
            params: { 
                id: movie.id,
            } 
        }"
    >
      <img :src="'https://image.tmdb.org/t/p/w370_and_h556_bestv2//' + movie.poster_path">
    </router-link>
      <h4>{{ movie.title }}</h4>
      <p v-if="movie.character != null">{{ movie.character }}</p>
    </div>
</template>


<script>
export default {
  name: "Movie",
  props: {
    movie: {}
  }
};
</script>



<style scoped>
img {
  height: 30vh;
  width: auto;
  margin: 0.1rem;
  transition: all 0.1s ease-in-out;
}

img:hover {
  transform: scale(1.03);
}

</style>



