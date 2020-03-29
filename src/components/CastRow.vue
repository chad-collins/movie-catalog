<template>
  <div class="row-container">
    <h3 class="row-title">{{ rowTitle }}</h3>
    <div class="cast-row-wrapper">
      <div v-for="actor in cast" :key="actor.id">
        <router-link
          :to="{ 
            name: 'actor', 
            params: { 
                id: actor.id,
                actor: actor
            } 
        }"
        >
          <img
            class="actor-headshot"
            :src="actor.profile_path | formatImageLink"
            :alt="'Photo of ' + actor.name"
          />
        </router-link>
        <p class="actor-name">{{ actor.name }}</p>
        <small v-if="actor.character" class="actor-role">{{ actor.character }}</small>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: "CastRow",

  props: {
    rowTitle: String,
    cast: Array
  }
};
</script>


<style scoped>
.row-container {
  box-shadow: inset 0 2px 25px #000000;
  padding-top: 1rem;
  margin: 2rem 0;
}

.row-title {
  color: white;
  font-size: 1.3rem;
  margin-left: 1.5rem;
  margin-bottom: 0.9rem;
}

.cast-row-wrapper > * {
  margin-left: 1.5rem;
}

.cast-row-wrapper > *:last-child {
  padding-right: 1.5rem;
}

.cast-row-wrapper {
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
  height: 12vw;
  transition: all 0.1s ease-in-out;
}

.actor-headshot:hover {
  transform: scale(1.03);
}

.actor-name {
  color: white;
}
</style>