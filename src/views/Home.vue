<template>
  <div id="app">
     <Showcase v-bind:movie="showcase" v-bind:videoId="videoId"/>
<MovieRow categoryName="Now Trending" :movies="trending"/>
  </div>
</template>


<script>

import MovieRow from "../components/MovieRow";
import Showcase from "../components/Showcase";
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
      trending: [],
  
    };
  
  },
    created() {
  this.fetch();
    
  },
   methods: {
    async fetch() {
      const { data } = await MoviesRepository.getTrending();
      this.trending = data.results;}
    },

    computed: {
      //return a random movie from the TRENDING MOVIES row
       showcase() {
          return this.trending[
            Math.floor(Math.random() * this.trending.length)
          ]  
          }
    }
  };
</script>
