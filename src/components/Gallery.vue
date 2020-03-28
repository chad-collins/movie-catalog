<template>
  <div class="window" >
    <div class="modal">
      <button @click="$emit('close')" class="close">X</button>

      <div class="modal-content">
        <div>
          <div class="carousel">
            <div v-for="poster in posters.slice(begin, end)" :key="poster">
              <img
                class="carousel-image"
                @click="currentImage=poster.file_path"
                :src="'https://image.tmdb.org/t/p/w154/' + poster.file_path"
              />
            </div>
          </div>
          <div class="carolusel-buttons">
            <input
              v-if="currentPage > 1"
              type="button"
              class="carolusel-button"
              id="previous"
              @click="previousPage()"
              value="previous"
            />
            <input
              v-if="currentPage < numberOfPages"
              type="button"
              class="carolusel-button"
              id="next"
              @click="nextPage()"
              value="next"
            />
          </div>
        </div>

        <figure class="current-image-box">
          <img class="current-img" :src="'https://image.tmdb.org/t/p/original/' + changeImage" alt="'Poster" />
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import { RepositoryFactory } from "../services/RepositoryFactory.js";
const MoviesRepository = RepositoryFactory.get("movies");
export default {
  data() {
    return {
      posters: [],
      currentPage: 1,
      numberPerPage: 8,
      numberOfPages: 1,
      currentImage: null,
      isActive: false
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const { data } = await MoviesRepository.getImagesById(
        this.$route.params.id
      );
      this.posters = data.posters;
      this.generatePages();
    },
    generatePages() {
      this.numberOfPages = Math.ceil(this.posters.length / this.numberPerPage);
    },

    nextPage() {
      this.currentPage += 1;
      this.loadList();
    },
    previousPage() {
      this.currentPage -= 1;
      this.loadList();
    }
    },
  computed: {
    begin() {
      return (this.currentPage - 1) * this.numberPerPage;
    },
    end() {
      return this.begin + this.numberPerPage;
    },
    changeImage(){
        if (this.currentImage==null){return this.posters[0].file_path}
        else return this.currentImage
    }
  }
};
</script>

<style scoped>
.window {
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 50000000;
}

.modal {
  height: 90%;
  background: rgb(68, 60, 60);
  border-radius: 5px;
  overflow: hidden;
  padding: 1rem;
  background: rgb(119,119,119);
  
}

.modal-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  display: flex;
  background: linear-gradient(90deg, rgba(119,119,119,0) 20%, rgba(25,25,25,1) 68%);
  
   

}

.carousel {
  display: grid;
  grid-template-columns: auto auto;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: center;
  height: max-content;
 
}

.carousel-image {
  padding: 0.5rem;
  transition: all 0.1s ease-in-out;
}

.carousel-image:hover {
    cursor: pointer;
  transform: scale(1.03);
}

.current-image-box {
  display: flex;
  padding: 0.5rem;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.current-img {
  max-height: 100%;
}

.close {
  background-color: black;
  border: none;
  height: 50px;
  width: 50px;
  position: fixed;
  padding: 1rem;
  border-radius: 50%;
  z-index: 5000;
}

.carolusel-buttons {
  display: flex;
}

.carolusel-button {
  color: red;
  width: 100%;
  height: 100%;
}


</style>