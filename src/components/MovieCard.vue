<template>
  <div class="movie-box">
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
      <div>{{movie.vote_average | rating}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: {}
  }
};
</script>

<style scoped>
.movie-box{
    display: flex;
    flex-direction: column;
    width:min-content;
}
img {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
}
.movie-info {
  padding: 0.5rem;
}

.movie-title {
  font-weight: bolder;
}
</style>