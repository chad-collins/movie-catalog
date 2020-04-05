<template>
  <div id="app">
    <Showcase v-bind:movie="showcaseMovie" :key="showcaseMovie.id" />
    <MovieRow rowTitle="Popular Now" :movies="row1" />
    <MovieRow rowTitle="Now Playing" :movies="row2" />
  </div>
</template>


<script>
import MovieRow from "../components/MovieRow";
import Showcase from "../components/TheShowcase";

import { RepositoryFactory } from "../services/RepositoryFactory.js";
const moviesRepository = RepositoryFactory.get("movies");

export default {
  name: "home",
  components: {
    Showcase,

    MovieRow
  },
  data() {
    return {
      showcaseMovie: {},
      row1: [],
      row2: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      {
      const { data } = await moviesRepository.getByCategory('popular');
      this.row1 = data.results;
      }
      {
        const { data } = await moviesRepository.getByCategory('now_playing');
        this.row2 = data.results;
      }

      {
        const showcase = await this.row2[
          Math.floor(Math.random() * this.row2.length)
        ];
        const { data } = await moviesRepository.getById(showcase.id);
        this.showcaseMovie = data;
      }
    }
  }
};
</script>
