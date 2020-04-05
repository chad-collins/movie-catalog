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
            <h1>{{ movie.title }}</h1>
          </router-link>
          <div class="title-box--row">
            <p class="certification">{{certification}}</p>
            <p>{{ spacer }}</p>
            <p class="info--date">{{ movie.release_date | year }}</p>
            <p>{{ spacer }}</p>

            <p>{{ movie.runtime | minutesToHours }}</p>
          </div>
        </div>

        <!-- NEW GRID OBJECT -->
        <p class="tagline grid-item">{{ movie.tagline }}</p>
        <!-- NEW GRID OBJECT -->
        <div class="rating-box">
          <p class="star-rating">{{movie.vote_average | rating}}</p>
          <button  class="show-btn" @click="showingVideoModal = true">
            <font-awesome-icon icon="play" />Watch the trailer
          </button>
        </div>
        <!-- NEW GRID OBJECT -->
        <div class="overview-box grid-item">
          <h2>Overview</h2>
          <p class="info-extra">{{ movie.overview.substring(0, 250)}}...</p>
        </div>
        <!-- NEW GRID OBJECT -->
        <div class="credits-box grid-item row">
          <h4>Directed by</h4>
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
@media (min-width: 600px) {
  #showcase {
    user-select: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 50vh;
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

    grid-template-areas:
      "poster   title"
      "poster   tagline"
      "poster    rating"
      "poster    overview"
      "poster   overview"
      "poster   credits";
    grid-column-gap: 50px;
  }

  .grid-item {
    text-shadow: #352b3d 0px 1px 5px;
  }

  .title-box {
    grid-area: title;
  }

  .title-box--row {
    display: flex;
    align-items: center;
  }
  .title-box--row > * {
    margin-right: 0.5rem;
  }

  .tagline {
    grid-area: tagline;
    font-style: italic;
    color: rgb(218, 218, 218);
  }

  .rating-box {
    grid-area: rating;
  }

  .star-rating {
    font-size: 2.5rem;
  }

  .poster {
    grid-area: poster;
  }

  .poster img {
    width: 300px;
  }

  .certification {
    color: white;
    font-size: 1rem;
    width: max-content;
    padding: 0 0.2rem;
    border-radius: 3px;
    border: 1px solid;
  }

  .overview-box {
    grid-area: overview;
    line-height: 1.8rem;
    color: white;
  }

  .credits-box {
    grid-area: credits;
    color: white;
  }

  h1,
  h2 {
    margin-bottom: 0.5rem;
  }

  a {
    text-decoration: none;
    color: white;
  }

  .mobile-only {
    display: none;
  }

  .show-btn {
    padding: 0.7rem;
    display: flex;
    align-items: center;
    border: 1px solid white;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0);
    color: #fdbb2d;
    text-indent: 1rem;
    font-weight: bolder;
    font-size: 1.1rem;
  }

  .info-wrapper > * {
    margin-top: 0.4rem;
  }

  .info-extra {
    display: block;
  }
}
@media (max-width: 599px) {
  .hero {
    background-image: none !important;
  }

  .info-container {
    padding: 1rem;
    display: flex;
    flex-wrap: wrap-reverse;
  }
  .info-wrapper {
    margin: 1rem;
  }
  .info-extra {
    display: none;
  }
  .mobile-backdrop {
    width: 100%;
  }
  .mobile-poster {
    width: 150px;
  }
}
@media (max-width: 400px) {
  .mobile-poster {
    width: 100px;
  }
}

.show-btn:hover {
  cursor: pointer;
  background-color: #856fd6;
}

.material-icons {
  margin-right: 0.6rem;
}

.info-wrapper {
  max-width: 650px;
}

.info--title {
  color: white;
  font-size: 2.5rem;
}

p {
  color: rgb(230, 230, 230);
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
}
</style>
