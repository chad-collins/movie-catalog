<template>
  <div>
    <Gallery @close="galleryShowing=false" v-if="galleryShowing==true" />
    <Showcase v-bind:movie="movie" />

    <div class="movie-nav">
      <button class="button" @click="galleryShowing = true">Gallery</button>
    </div>

    <!--OVERVIEW SECTION-->
    <div>
      <div class="info-container">
        <img
          class="movie-poster"
          v-bind:src="'https://image.tmdb.org/t/p/w370_and_h556_bestv2//' + movie.poster_path"
        />

        <div class="info-wrapper">
          <h2>Synopsis</h2>
          <p>{{movie.overview}}</p>
          <ul class="stat-list">
            <li class="stat">
              <p class="stat--label">Runtime:</p>
              <p class="stat--content">{{ movie.runtime | minutesToHours }}</p>
            </li>
            <li class="stat">
              <p class="stat--label">Release Date:</p>
              <p class="stat--content">{{ movie.release_date | date}}</p>
            </li>
            <li class="stat">
              <p class="stat--label">Genres:</p>
              <small
                class="genres"
                v-bind:key="genre.name"
                v-for="genre in movie.genres"
              >{{ genre.name }}</small>
            </li>
            <li class="stat">
              <p class="stat--label">Directed by:</p>
              <p
                class="stat--content"
                v-bind:key="director.id"
                v-for="director in movieDirectors"
              >{{ director.name }}</p>
            </li>
            <li class="stat">
              <p class="stat--label">Budget:</p>
              <p class="stat--content">{{ movie.budget | dollars }}</p>
            </li>
            <li class="stat">
              <p class="stat--label">Revenue:</p>
              <p class="stat--content">{{ movie.revenue | dollars }}</p>
            </li>
            <li class="stat">
              <p class="stat--label">Link:</p>
              <a class="stat--content" :href="movie.homepage" target="_blank">{{ movie.homepage }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <CastRow rowTitle="Cast" v-bind:cast="movie.credits.cast" />
    <MovieRow rowTitle="Similar Movies" v-bind:movies="similar" />
  </div>
</template>

<script>
import Showcase from "../components/Showcase";
import Gallery from "../components/Gallery";
import MovieRow from "../components/MovieRow.vue";
import CastRow from "../components/CastRow";
import { RepositoryFactory } from "../services/RepositoryFactory.js";
const MoviesRepository = RepositoryFactory.get("movies");

export default {
  name: "Movie",
  components: {
    Showcase,
    CastRow,
    MovieRow,
    Gallery
  },
  data() {
    return {
      movie: {},
      similar: {},
      reviews: {},
      galleryShowing: false
    };
  },
  created() {
    this.fetch();
  },

  methods: {
    async fetch() {
      const id = this.$route.params.id;
      {
        const { data } = await MoviesRepository.getById(id);
        this.movie = data;
      }
      {
        const { data } = await MoviesRepository.getSimilarById(id);
        this.similar = data.results;
      }
    }
  },

  computed: {
    movieDirectors() {
      let directors = [];
      this.movie.credits.crew.forEach(element => {
        let a = element.job.toLowerCase();
        if (a == "director") {
          directors.push(element);
        }
      });
      return directors;
    }
  }
};
</script>

<style scoped>
.genres {
  background-color: #6c54c5;
  padding: 0.3rem 0.8rem;
  margin: 0.3rem;
  border-radius: 15px;
}

.temp {
  text-align: center;
  margin: 3rem;
  color: white;
  font-size: 3rem;
}
.info-container {
  margin: 1rem;
  display: flex;
  flex-wrap: wrap;
  max-width: 1000px;
}

.movie-poster {
  height: 100%;
  max-height: 556px;
}

@media (min-width: 600px) {
  .movie-poster {
    min-width: 320px;
    height: min-content;
    margin-right: 1rem;
  }
}
@media (max-width: 599px) {
  .movie-poster {
    display: none;
  }
}

.movie-nav {
  display: flex;
  justify-content: center;
}

.info-wrapper {
  flex: 1;
  flex-shrink: unset;
}
.info-wrapper > * {
  margin: 1rem;
}

button {
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  margin: 1rem;
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

.stat--splitter {
  color: orange;
}

.italic {
  font-style: italic;
}
</style>