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
        {{ movie.title.substring(0, 22)}}
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
    background-color: white;
    border-radius: 10px;
    
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
}
img {
  overflow: hidden;
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid rgb(189, 189, 189);
}
.movie-info {
  padding: 0.5rem;
}

.movie-title {
  font-weight: bolder;
}
</style>