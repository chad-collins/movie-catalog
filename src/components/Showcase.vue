<template>
  <div
    class="hero"
    v-bind:style="{ backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 18%, rgba(255, 255, 255, 0) 100%), url(' + 'https://image.tmdb.org/t/p/original' + movie.backdrop_path + ')' }"
  >
    <div v-if="!isHidden" class="vid-container">
      <button class="close-btn" @click="isHidden = !isHidden">X</button>
      <div class="video-responsive">
        <iframe
          id="ytplayer"
          type="text/html"
          width="640"
          height="360"
          :src="'https://www.youtube.com/embed/' + videoId.key + '?autoplay=1'"
          frameborder="0"
          allowfullscreen
        ></iframe>
        <!-- <youtube
          :video-id="videoId.key"
          @ready="ready"
          @playing="playing"
          :player-vars="{ autoplay: 1 }"
        ></youtube>-->
      </div>
    </div>
    <img
      class="mobile-only mobile-backdrop"
      v-bind:src="'https://image.tmdb.org/t/p/original' + movie.backdrop_path"
    >
    <div class="info-container">
      <!-- <img
        class="mobile-only mobile-poster"
        v-bind:src="'https://image.tmdb.org/t/p/original' + movie.poster_path"
      > -->
      <div class="info-wrapper">
        <p class="info--title">{{ movie.title }}</p>

        <p class="info--date">{{ movie.release_date.substring(0, 4)}}</p>
        <p
          class="info--date"
        >{{ movie.vote_average + '/10' + ' (' + movie.vote_count + ' reviews)'}}</p>
        <p>{{ movie.tagline }}</p>
        <p class="info-extra">{{ movie.overview.substring(0, 250)}}...</p>
      </div>
    </div>
    <button class="show-btn" @click="isHidden = !isHidden">
      <i class="material-icons">play_arrow</i>Watch Trailer
    </button>
  </div>
</template>

<script>
export default {
  name: "Showcase",
  props: {
    movie: {},
    videoId: {}
  },
  data() {
    return { isHidden: true };
  }
};
</script>


<style scoped>
.video-responsive {
  overflow: hidden;
  padding-bottom: 56.25%;
  position: top;
  display: flex;
  justify-content: center;
  align-items: center;
}
.video-responsive iframe {
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  position: absolute;
}

.vid-container {
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
  z-index: 900000;
  width: 100vw;
  height: 100vh;
}

.close-btn {
  border: none;
  color: white;
  background-color: inherit;
  font-size: 1.5rem;
  position: absolute;
  padding: 1rem;
  float: left;
  z-index: 900001;
}

@media (min-width: 600px) {
  .hero {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 1rem;
    width: 100%;
    height: 70vh;
  }

  .mobile-only {
    display: none;
  }

  .show-btn {
    background-color: rgb(108, 84, 197);
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border: none;
    color: white;
    margin-top: 2rem;
    padding: 0.7rem 1.2rem;
    max-width: 250px;
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

.hero {
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) 18%,
    rgba(255, 255, 255, 0) 100%
  );
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.show-btn {
  background-color: rgb(108, 84, 197);
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  border: none;
  color: white;
  margin-top: 2rem;
  padding: 1.3rem;
  font-size: 1.2rem;
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
