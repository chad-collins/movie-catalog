<template>
  <div id="app">
    <Showcase v-bind:movie="showcaseMovie" :key="showcaseMovie.id" />
    <MovieRow rowTitle="Popular Now" :movies="trending" />
    <MovieRow rowTitle="Now Playing" :movies="upcoming" />
  </div>
</template>


<script>
import MovieRow from "../components/MovieRow";
import Showcase from "../components/TheShowcase";

import { RepositoryFactory } from "../services/RepositoryFactory.js";
const MoviesRepository = RepositoryFactory.get("movies");

export default {
  name: "home",
  components: {
    Showcase,

    MovieRow
  },
  data() {
    return {
      showcaseMovie: {},
      trending: [],
      upcoming: []
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
      }
      {
        const { data } = await MoviesRepository.getUpcoming();
        this.upcoming = data.results;
      }

      {
        const showcase = await this.upcoming[
          Math.floor(Math.random() * this.upcoming.length)
        ];
        const { data } = await MoviesRepository.getById(showcase.id);
        this.showcaseMovie = data;
      }
    }
  }
};
</script>
