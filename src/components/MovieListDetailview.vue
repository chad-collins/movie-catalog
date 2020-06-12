<template>
  <ul>
    <li class="item" v-for="movie in movies" :key="movie.id">
      <div class="left-col">
        <router-link
          :to="{ 
            name: 'movie', 
            params: { 
                id: movie.id,
            } 
        }"
        >{{movie.title}}</router-link>
        <div>{{movie.character}}</div>

        <div>{{movie.vote_average | rating}}</div>
      </div>
    <div>{{movie.release_date | year}}</div>
     
    </li>
  </ul>
</template>
<script>
export default { 
  props: { movies: Array } 
  };
</script>
<style scoped>
ul {
    display: flex;
  flex-direction: column;
  width: 100%;
}

li {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
}

li:nth-child(even) {
  background-color: rgba(227, 227, 240, 0.65);
}

a {
  color: rgb(108, 84, 197);
  font-weight: bolder;
  text-decoration: none;
}

@media (max-width: 699px) {
  li{
    font-size: 0.8rem;
  }
}
</style>