<template>
  <div class="modal-window">
    <button class="close-btn" @click="$emit('close')"><font-awesome-icon icon="window-close" /></button>
   <iframe
          id="ytplayer"
          type="text/html"
          width="640"
          height="360"
          :src="'https://www.youtube.com/embed/' + videoId.key + '?autoplay=1'"
          frameborder="0"
          allowfullscreen
        ></iframe>
  </div>
</template>

<script>
import { RepositoryFactory } from "../services/RepositoryFactory.js";
const MoviesRepository = RepositoryFactory.get("movies");
export default {
  props: {
    movieId: String
  },
  data() {
    return {
      videoId: ''
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const { data } = await MoviesRepository.getVideoById(this.movieId);
      this.videoId = data.results[0];
    }
  }
};
</script>

<style  scoped>
.modal-window {
  background-color: black;
  overflow: hidden;
  padding-bottom: 56.25%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 900000;
}
iframe {
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  position: fixed;
}


.close-btn {
  border: none;
  color: white;
  background-color: inherit;
  font-size: 2rem;
  font-weight: bolder;
  position: absolute;
  padding: 1rem;
  top: 0;
  left: 0;
  z-index: 900001;
}

.close-btn:hover {
  cursor: pointer;
}
</style>