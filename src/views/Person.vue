<template>
  <div id="page">
    <div class="grid">
      <article class="bio" v-if="actor.biography">
        <h1>{{ actor.name }}</h1>

        <p>{{ bio[0] }}</p>
        <div v-if="expandedBio == true">
          <p v-for="par in bio.slice(1)" :key="par">{{ par }}</p>
        </div>
        <button
          v-if="bio.length > 1"
          class="expand-bio-button"
          v-on:click="expandedBio = !expandedBio"
        >{{ expandMsg }}</button>
      </article>

      <div class="info">
        <img
          class="headshot"
          v-bind:src="'https://image.tmdb.org/t/p/w300' + actor.profile_path"
          v-bind:alt="'Photo of ' + actor.name"
        />

        <div class="stats-wrapper">
          <h2 class="stats-title">Info</h2>
          <ul class="stat-list">
            <li class="stat">
              <h3 class="stat--label">Birthday</h3>
              <p class="stat--content">{{ actor.birthday | date }}</p>
            </li>
            <li class="stat" v-if="actor.deathday != null">
              <h3 class="stat-~-label">Died</h3>
              <p class="stat--content">{{ actor.deathday | date}}</p>
            </li>
            <li class="stat" v-if="actor.place_of_birth != null">
              <h3 class="stat--label">Birthplace</h3>
              <p class="stat--content">{{ actor.place_of_birth }}</p>
            </li>
            <li class="stat">
              <h3 class="stat--label">Known For</h3>
              <p class="stat--content">{{ actor.known_for_department }}</p>
            </li>
            <li class="stat">
              <h3 class="stat--label">Film Credits</h3>
              <p class="stat--content">{{ movies.length }}</p>
            </li>
            <li class="stat">
              <a :href="actor.homepage">
                <font-awesome-icon class="stat--link" icon="link" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="credits">
        <button class="button" @click="galleryShowing = true">Gallery</button>

        <Gallery @close="galleryShowing=false" v-if="galleryShowing==true" />
        <MovieList v-bind:movies="movies" />
      </div>
    </div>
  </div>
</template>


<script>
import Gallery from "../components/Gallery";
import MovieList from "../components/MovieList";
import { RepositoryFactory } from "../services/RepositoryFactory.js";
const ActorsRepository = RepositoryFactory.get("actors");

export default {
  name: "Actor",
  components: { Gallery, MovieList },
  data() {
    return {
      knownFor: [],
      movies: [],
      actor: {},
      expandedBio: false,
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
    }
  },
  computed: {
    bio() {
      return this.actor.biography.split("\n\n");
    },
    expandMsg() {
      return this.expandedBio ? "\u00AB Show Less" : "Show More \u00BB";
    }
  }
};
</script>


<style scoped>
#page {
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.grid {
  padding: 1rem;
  max-width: 1200px;
  display: grid;
  grid-template-areas:
    "info    bio"
    "info    credits"
    "info     credits";
  grid-column-gap: 50px;
  grid-row-gap: 50px;
}

li {
  list-style: none;
}

.info {
  grid-area: info;
}

.bio {
  grid-area: bio;
  line-height: 1.5rem;
}

.credits {
  grid-area: credits;
}

.stats-title,
.stat {
  margin: 1rem 0;
}

.stat--link {
  color: black;
  text-decoration: none;
  font-size: 1.3rem;
}

h1 {
  font-size: 2rem;
}

article p {
  margin: 2rem 0;
}

.expand-bio-button {
  color: #856fd6;
  background-color: inherit;
  border: none;
  font-size: 1rem;
  font-weight: bolder;
}
.expand-bio-button:hover {
  color: #1fb15b;
}
</style>
