<template>
  <div class="row-container">
    <h3 class="row-title">Cast</h3>
    <div class="cast-row-wrapper">
      <div v-for="actor in cast" :key="actor.id"><router-link
    :to="{ 
            name: 'actor', 
            params: { 
                id: actor.id,
                actor: actor
            } 
        }"
  >
      <img
      v-if="actor.profile_path"
        class="actor-headshot"
        v-bind:src="'https://image.tmdb.org/t/p/w370_and_h556_bestv2//' + actor.profile_path"
        v-bind:alt="'Photo of ' + actor.name"
      >
  </router-link>
      <p class="actor-name">{{ actor.name }}</p>
      <p v-if="actor.character" class="actor-role">{{ actor.character }}</p></div>
    </div>
  </div>
</template>


<script>


export default {
  name: "CastRow",
 
  props: {
    categoryName: String,
    cast: Array
  }
};
</script>


<style scoped>

.row-title {
  color: white;
  size: 2rem;
  margin-left: 1.5rem; 
}

.cast-row-wrapper > * {
  margin-left: 1.5rem;
}

.cast-row-wrapper > *:last-child {
  padding-right:1.5rem;
}

.cast-row-wrapper{
  display: flex;
  width: 100%;
  height: auto;
  overflow-y: hidden; /* Hide horizontal scrollbar */
  overflow-x: scroll; /* Add vertical scrollbar */
}

.actor {
  height: auto;
  width: auto;
  margin: 1rem;
}

.actor-headshot {
  width: auto;
  height: 200px;
  transition: all 0.1s ease-in-out;
}

.actor-headshot:hover {
  transform: scale(1.03);
}

.actor-name {
  color: white;
}

</style>