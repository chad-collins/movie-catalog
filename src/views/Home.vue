<template>
  <div id="app">
    <Showcase v-bind:movie="showcaseMovie" :key="showcaseMovie.id" />
    <MovieRow rowTitle="Popular Now" :movies="trending" />
    <MovieRow rowTitle="Now Playing" :movies="upcoming" />
    <CastRow rowTitle="Popular Actors" v-bind:cast="popularActors" />
  </div>
</template>


<script>
import MovieRow from "../components/MovieRow";
import Showcase from "../components/Showcase";
import CastRow from "../components/CastRow";
import { RepositoryFactory } from "../services/RepositoryFactory.js";
const MoviesRepository = RepositoryFactory.get("movies");
const ActorsRepository = RepositoryFactory.get("actors");

export default {
  name: "home",
  components: {
    Showcase,
    CastRow,
    MovieRow
  },
  data() {
    return {
      showcaseMovie: {},
      trending: [],
      upcoming: [],
      popularActors: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      {
        const { data } = await MoviesRepository.getTrending();
        this.trending = data.results;
        this.getShowcaseMovie();
      }
      {
        const { data } = await MoviesRepository.getUpcoming();
        this.upcoming = data.results;
      }
      {
        const { data } = await ActorsRepository.getPopular();
        this.popularActors = data.results;
      }
    },
    getShowcaseMovie() {
      this.showcaseMovie = this.trending[
        Math.floor(Math.random() * this.trending.length)
      ];
    }
  }
};
</script>
