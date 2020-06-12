<template>
  <div id="page">
    <div class="grid">
      <h1 class="actor-name">{{ actor.name }}</h1>
      <div class="bio">
        <h2>Biography</h2>
        <div v-if="actor.biography">
        <p >{{ bio[0] }}</p>
        <div v-if="expandedBio == true">
          <p v-for="par in bio.slice(1)" :key="par">{{ par }}</p>
        </div>
        <button
          v-if="bio.length > 1"
          class="expand-bio-button"
          v-on:click="expandedBio = !expandedBio"
        >{{ expandMsg }}</button>
        </div>
        <div>
          <h2>Credits</h2>
          <MovieList v-bind:movies="movies" defaultView="details" />
        </div>
      </div>

      <img
        class="headshot"
        v-bind:src="'https://image.tmdb.org/t/p/w300' + actor.profile_path"
        v-bind:alt="'Photo of ' + actor.name"
      />
      <div class="info">
        <div class="stats-wrapper">
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
              <h3 class="stat--label">Home Page</h3>
              <a :href="actor.homepage">
                <font-awesome-icon class="stat--link" icon="link" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import MovieList from "../components/MovieList";
import { RepositoryFactory } from "../services/RepositoryFactory.js";
const ActorsRepository = RepositoryFactory.get("actors");

export default {
  name: "Actor",
  components: { MovieList },
  data() {
    return {
      knownFor: [],
      movies: [],
      actor: {},
      expandedBio: false
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

li {
  list-style: none;
}

.info {
  grid-area: info;
}

.actor-name {
  grid-area: name;
}
.headshot {
  grid-area: headshot;
}

.bio {
  grid-area: bio;
  line-height: 1.5rem;
}

.credits {
  grid-area: credits;
}

.stat--link {
  color: black;
  text-decoration: none;
  font-size: 1rem;
}

h1 {
  padding-bottom: 1rem;
  font-size: 2.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

h2 {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
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

@media (max-width: 699px) {
  .headshot {
    width: 40vw;
  }

  .grid {
    width: 100vw;
    padding: 1rem;
    max-width: 1200px;
    display: grid;
    grid-template-areas:
      "headshot name"
      "headshot info"
      "bio      bio"
      "credits credits";
    grid-column-gap: 15px;
  }

  .stats-title,
  .stat {
    margin: 0.5rem 0;
  }
  .stat > * {
    font-size: 0.8rem;
  }
  h1 {
    font-size: 1.5rem;
  }
}

@media (min-width: 700px) {
  #page {
    padding-top: 1rem;
  }

  .grid {
    padding: 1rem;
    max-width: 1200px;
    display: grid;
    grid-template-areas:
      "headshot name"
      "headshot bio"
      "info     bio"
      ".        bio";

    grid-column-gap: 50px;
    grid-row-gap: 10px;
  }

  .stats-title,
  .stat {
    margin: 1rem 0;
  }
}
</style>
