<template>
  <div
    id="showcase"
    v-bind:style="{ backgroundImage: 'url(' + 'https://image.tmdb.org/t/p/original' + movie.backdrop_path + ')' }"
  >
    <div class="container">
      <div class="grid">

        <!-- NEW GRID OBJECT -->
        <router-link
          class="poster grid-item"
          :to="{ 
            name: 'movie', 
            params: { 
                id: movie.id,
            } 
        }"
        >
          <img v-bind:src="'https://image.tmdb.org/t/p/w370_and_h556_bestv2//' + movie.poster_path" />
        </router-link>
        <!-- NEW GRID OBJECT -->
        <div class="title-box grid-item">
          <router-link
            :to="{ 
            name: 'movie', 
            params: { 
                id: movie.id,
            } 
        }"
          >
            <div class="movie-title">{{ movie.title }}</div>
          </router-link>
        </div>
        <!-- NEW GRID OBJECT -->
        <div class="movie-stats">
          <p class="certification">{{certification}}</p>
          <p class="spacer">{{ spacer }}</p>
          <p class="info--date">{{ movie.release_date | year }}</p>
          <p class="spacer">{{ spacer }}</p>

          <p>{{ movie.runtime | minutesToHours }}</p>
        </div>
        <!-- NEW GRID OBJECT -->
        <p class="tagline grid-item">{{ movie.tagline }}</p>
        <!-- NEW GRID OBJECT -->
        <div class="rating-box">
          <p class="star-rating">{{movie.vote_average | rating}}</p>
        </div>
        <!-- NEW GRID OBJECT -->
        <button class="show-btn" @click="showingVideoModal = true">
          <font-awesome-icon icon="play" />Watch the trailer
        </button>
        <!-- NEW GRID OBJECT -->
        <div class="overview-box grid-item">
          <h2>Overview</h2>
          <p class="info-extra">{{ movie.overview.substring(0, 250)}}...</p>
        </div>
        <!-- NEW GRID OBJECT -->
        <div class="credits-box grid-item row">
          <h4 v-if="director">Directed by</h4>
          <small>{{director}}</small>
        </div>
      </div>
      <!-- END GRID -->
    </div>

    <VideoModal
      v-if="showingVideoModal == true"
      @close="showingVideoModal = false"
      :movieId="movie.id"
    />
  </div>
</template>  <font-awesome-icon icon="play" />

<script>
import VideoModal from "./TheVideoModal";
import { RepositoryFactory } from "../services/RepositoryFactory.js";
const MoviesRepository = RepositoryFactory.get("movies");
export default {
  components: { VideoModal },
  props: {
    movie: {}
  },
  data() {
    return {
      showingVideoModal: false,
      director: "",
      certification: ""
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const { data } = await MoviesRepository.getById(this.movie.id);

      const mpaa = data.release_dates.results.find(
        element => element.iso_3166_1 == "US"
      );

      this.certification = mpaa.release_dates[0].certification
        ? mpaa.release_dates[0].certification
        : "NR";

      this.director = data.credits.crew.find(
        element => element.job.toLowerCase() == "director"
      ).name;
    }
  },
  computed: {
    spacer() {
      return "\u25C7";
    }
  }
};
</script>


<style scoped>
#showcase {
  user-select: none;
}

.showcase-title {
  font-size: 2rem;
  padding: 1rem;
}

.grid {
  display: grid;
}

.grid-item {
  text-shadow: #352b3d 0px 1px 5px;
}

.title-box {
  grid-area: title;
}

.credits-box {
  grid-area: credits;
  color: white;
}

.poster {
  grid-area: poster;
}

.rating-box {
  grid-area: rating;
}

.tagline {
  grid-area: tagline;
  font-style: italic;
  color: rgb(218, 218, 218);
}

.overview-box {
  grid-area: overview;
  line-height: 1.8rem;
  color: white;
}

a {
  text-decoration: underline;
  color: white;
}

.star-rating {
  font-size: 1.5rem;
  color: white;
}

.show-btn {
  grid-area: button;
  align-items: center;
  justify-content: center;
}

.movie-stats {
  grid-area: stats;
  color: white;
}

.showcase-title {
  grid-area: header;
}

@media (max-width: 599px) {
  .movie-title {
    font-size: 1.4rem;
    font-weight: bold;
  }

  .show-btn {
    width: 100%;
    height: 3rem;
    margin-top: 1rem;
    display: flex;
    border: none;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.3);
    color: #fdbb2d;
    text-indent: 1rem;
    font-weight: bolder;
    font-size: 1.1rem;
  }

  #showcase {
    color: white;
    background-image: none !important;
    max-width: 100vw;
    overflow: hidden;
    background-color: #362c3f;
  }

  .movie-stats {
    display: flex;
    margin: 1rem 0;
    justify-content: space-evenly;
  }

  .grid {
    padding: 1rem;
    grid-template-areas:
      "poster   title"
      "poster   rating"
      "poster   credits"
      "poster   tagline"
      "poster   tagline"
      "poster   tagline"
      "stats    stats"
      "overview overview"
      "button   button";
  }

  .poster img {
    max-width: 40vw;
    margin-top: 1rem;
  }
}

@media (min-width: 600px) {
  .show-btn {
    min-width: 240px;
    max-width: 300px;
    height: 50px;
    display: flex;
    border: 1px solid white;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0);
    color: #fdbb2d;
    text-indent: 1rem;
    font-weight: bolder;
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  #showcase {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    min-height: 50vh;
  }

  .container {
    background: linear-gradient(
      25deg,
      rgb(50, 38, 94) 0%,
      rgba(74, 54, 105, 0.881) 54%,
      rgba(253, 187, 45, 0.8197479675463936) 100%
    );
    width: inherit;
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .grid {
    display: grid;
    max-width: 1200px;
    padding: 2rem;

    grid-template-areas:
      "poster   title"
      "poster   stats"
      "poster   tagline"
      "poster    rating"
      "poster    button"
      "poster   overview"
      "poster   overview"
      "poster   overview"
      "poster   credits";
    grid-column-gap: 50px;
  }

  .movie-stats {
    display: flex;
    align-items: center;
  }

  .movie-stats > * {
    margin-right: 0.5rem;
  }

  .poster img {
    max-width: 100%;
  }

  .certification {
    color: white;
    font-size: 1rem;
    width: max-content;
    padding: 0 0.2rem;
    border-radius: 3px;
    border: 1px solid;
  }

  .info-wrapper > * {
    margin-top: 0.4rem;
  }

  .info-extra {
    display: block;
  }

  .movie-title {
    font-size: 2rem;
  }

  h2 {
    margin-bottom: 0.5rem;
    font-size: 1rem.5;
  }

  .star-rating {
    font-size: 2.5rem;
  }
}
</style>
