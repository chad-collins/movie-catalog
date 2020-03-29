<template>
  <div>
    <div class="hero">
      <img
        v-bind:src="'https://image.tmdb.org/t/p/w370_and_h556_bestv2//' + actor.profile_path"
        v-bind:alt="'Photo of ' + actor.name"
      />
      <div class="info-wrapper">
        <h2>{{ actor.name }}</h2>
        <ul class="stat-list">
          <li class="stat">
            <p class="stat--label">Birthday:</p>
            <p class="stat--content">{{ actor.birthday | date }}</p>
          </li>
          <li class="stat" v-if="actor.deathday != null">
            <p class="stat--label">Died:</p>
            <p class="stat--content">{{ actor.deathday | date}}</p>
          </li>
          <li class="stat" v-if="actor.place_of_birth != null">
            <p class="stat--label">Birthplace:</p>
            <p class="stat--content">{{ actor.place_of_birth }}</p>
          </li>
        </ul>
        <article>
          {{ actor.biography.substring(0, 500)}}
          <span
            v-if="actor.biography.length > 500 && expanded === false"
          >...</span>
          <span v-if="expanded===true">{{ actor.biography.substring(500)}}</span>
        </article>
        <button
          v-if="actor.biography.length > 500 && expanded === false"
          @click="expanded = true"
        >show more</button>
        <button
          v-if="actor.biography.length > 500 && expanded === true"
          @click="expanded = false"
        >show less</button>
      </div>
    </div>

    <div class="movie-nav">
      <button class="button" @click="galleryShowing = true">Gallery</button>
    </div>
    <Gallery @close="galleryShowing=false" v-if="galleryShowing==true" />
    <MovieRow categoryName="Acting Credits:" v-bind:movies="movies" />
  </div>
</template>


<script>
import Gallery from "../components/Gallery";
import MovieRow from "../components/MovieRow.vue";
import { RepositoryFactory } from "../services/RepositoryFactory.js";
const ActorsRepository = RepositoryFactory.get("actors");

export default {
  name: "Actor",
  components: { MovieRow, Gallery },
  data() {
    return {
      movies: [],
      actor: {},
      expanded: false,
      galleryShowing: false
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      {
        const { data } = await ActorsRepository.getById(this.$route.params.id);
        this.actor = data;
      }
      {
        const { data } = await ActorsRepository.getActingCredits(
          this.$route.params.id
        );
        this.movies = data.cast;
      }
    },
  },
  computed:{
    
  }
};
</script>


<style scoped>
.hero {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  background: #45484d;
  background: -moz-linear-gradient(top, #45484d 0%, #000000 100%);
  background: -webkit-linear-gradient(top, #45484d 0%, #000000 100%);
  background: linear-gradient(to bottom, #45484d 0%, #000000 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#45484d', endColorstr='#000000',GradientType=0 );
}
.info-wrapper > * {
  margin: 1rem;
  max-width: 700px;
}

.hero img {
  height: 400px;
  width: auto;
}

article {
  color: white;
  max-width: 1000px;
}

li {
  margin: 0.5rem 0;
}

.stat {
  display: flex;
}

.stat--label {
  width: 100px;
  color: white;
}

.stat--content {
}
</style>
