<template>
  <div id="page">
    <!--<Gallery @close="galleryShowing=false" v-if="galleryShowing==true" />-->
    <Showcase v-bind:movie="movie" :key="movie.id" />

    <div class="movie-nav">
      <!--<button class="button" @click="galleryShowing = true">Gallery</button>-->
    </div>
    <div class="grid">
      <!--OVERVIEW SECTION-->

      <div class="stats grid-area">
        <ul class="stat-list">
          <li class="stat">
            <h3 class="stat--label">Status</h3>
            <p class="stat--content">{{ movie.status}}</p>
          </li>
          <li class="stat">
            <h3 class="stat--label">Release Date</h3>
            <p class="stat--content">{{ movie.release_date | date}}</p>
          </li>

          <li class="stat">
            <h3 class="stat--label">Budget:</h3>
            <p class="stat--content">{{ movie.budget | dollars }}</p>
          </li>
          <li class="stat">
            <h3 class="stat--label">Revenue</h3>
            <p class="stat--content">{{ movie.revenue | dollars }}</p>
          </li>
          <li class="stat">
            <h3 class="stat--label">Genres:</h3>
            <div class=" genre-wrapper">
            <small
              class="genre"
              v-bind:key="genre.name"
              v-for="genre in movie.genres"
            >{{ genre.name }}</small></div>
          </li>
           <li class="stat">
            <h3 class="stat--label">Homepage:</h3>
            <a class="stat--content" :href="movie.homepage" target="_blank">
              <font-awesome-icon class="stat--link" icon="link" />
            </a>
          </li>
        </ul>
      </div>
      <PersonRow class="cast grid-area" rowTitle="Cast" v-bind:people="movie.credits.cast" />
      <!-- <PersonRow class="crew grid-area" rowTitle="Crew" v-bind:people="movie.credits.crew" /> -->
      <MovieRow class="similar grid-area" rowTitle="Similar Movies" v-bind:movies="similar" />
    </div>
  </div>
</template>

<script>
import Showcase from "../components/TheShowcase";
import MovieRow from "../components/MovieRow.vue";
import PersonRow from "../components/PersonRow";
import { RepositoryFactory } from "../services/RepositoryFactory.js";
const MoviesRepository = RepositoryFactory.get("movies");

export default {
  name: "Movie",
  components: {
    Showcase,
    PersonRow,
    MovieRow,
  },
  data() {
    return {
      movie: {},
      similar: {},

    };
  },
  created() {
    this.fetch();
  },

  methods: {
    async fetch() {
      const id = this.$route.params.id;

      const { data } = await MoviesRepository.getById(id);
      this.movie = data;
      {
        const { data } = await MoviesRepository.getSimilarById(id);
        this.similar = data.results;
      }
    }
  }
};
</script>

<style scoped>



.genre-wrapper {
  display: flex;
  flex-wrap: wrap;
  max-width: 350px;
}

.genre {
  color: white; 
  background-color: #6c54c5;
  padding: 0.3rem 0.8rem;
  margin: 0.3rem;
  border-radius: 15px;
}

.stats {
  grid-area: stats;
}

.cast {
  grid-area: cast;
}

.crew {
  grid-area: crew;
}

/deep/.cast img, /deep/.crew img {
  width: 150px;
}




.stats-title,
.stat {
  margin: 1rem 0;
}

.similar {
  grid-area: similar;
}

.cast, .crew,
.similar {
  max-width: 800px;
}

li {
  list-style: none;
}

.italic {
  font-style: italic;
}

.stat--link {
  color: black;
  text-decoration: none;
  font-size: 1.3rem;
}

@media (max-width: 699px) {
.stats {
  width: 100%;
  border-bottom: 1px solid gray;
}
li:nth-child(odd){
 background-color: rgba(227, 227, 240, 0.65);
}
.stat {
  width: 100%;
    padding: 0.5rem;
}
}

.cast, .similar {
  margin-top: 1rem;
}



@media (min-width: 700px) {

  #page {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  }

.cast, .similar {
  max-width: 55vw;
}

.grid {
  padding: 1rem;
  display: grid;
  grid-template-areas:
    "cast     stats"
    "similar  stats";

  grid-column-gap: 100px;
  grid-row-gap: 50px;
}

}
</style>