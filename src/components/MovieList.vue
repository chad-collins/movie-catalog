<template>
  <div>
    <div class="sort-buttons-row">
      <div class="row-left">
        <div
          class="sort-button"
          v-for="option in sortOptions"
          :key="option.key"
          v-on:click="sortList(option.key)"
        >
          <div>{{ option.value }}</div>
          <div v-if="sortedBy.includes(option.key)">{{ arrow }}</div>
        </div>
      </div>
      <div class="row-right">
        <font-awesome-icon
          v-on:click="listView = 'details'"
          :class="{'active' : listView == 'details'}"
          class="display-button"
          icon="list"
        />
        <font-awesome-icon
          v-on:click="listView = 'grid'"
          :class="{'active' : listView == 'grid'}"
          class="display-button"
          icon="th"
        />
      </div>
    </div>

    <div class="department-row">
      <button>{{department}}</button>
      <div v-for="department in departments" :key="department">
        <div v-on:click="updateActiveList(department)">{{department}}</div>
      </div>
    </div>

    <MovieListDetailview v-if="listView == 'details'" :movies="listToShow" />
    <MovieListGridView v-else :movies="movies" />
  </div>
</template>

<script>
import MovieListGridView from "./MovieListGridView";
import MovieListDetailview from "./MovieListDetailview";
import { RepositoryFactory } from "../services/RepositoryFactory.js";
const MoviesRepository = RepositoryFactory.get("movies");
export default {
  name: "list",
  components: { MovieListDetailview, MovieListGridView },
  props: { movies: Array },
  data() {
    return {
      activeList: "acting",
      departments: {},
      listView: "details",
      genreList: [],
      sortedBy: "popularity",
      sortedDescending: true,
      sortOptions: [
        { key: "title", value: "Title" },
        { key: "release_date", value: "Year" },
        { key: "popularity", value: "Popularity" },
        { key: "vote_average", value: "Avg Score" }
      ]
    };
  },

  created() {
    this.organizeMovies();
    this.fetch();
  },

  methods: {
    async fetch() {
      const id = this.$route.params.id;
      {
        const { data } = await MoviesRepository.getGenres(id);
        this.genreList = data.genres;
      }
    },

    sortList(property) {
      property === this.sortedBy
        ? (this.sortedDescending = !this.sortedDescending)
        : (this.sortedDescending = true),
        (this.sortedBy = property);

      this.sortedDescending == true
        ? this.movies.sort((a, b) => (a[property] > b[property] ? -1 : 1))
        : this.movies.sort((a, b) => (a[property] > b[property] ? 1 : -1));
    },

    organizeMovies() {
      this.departments.acting = [];
      this.departments.push(this.movies.cast);
      this.departments.crew = [];
      this.departments.sound = [];
      this.departments.directing = [];
      this.departments.art = [];
      this.departments.writing = [];
      this.departments.producing = [];
      this.departments.other = [];
      this.forLoop();
    },

    async forLoop() {
      await this.movies.crew.foreach(element => {
        console.log(element.department);
        if (element.department == "Directing") {
          this.departments.directing(element);
        }
        if (element.department == "Production") {
          this.departments.producing(element);
        }
        if (element.department == "Crew") {
          this.departments.crew(element);
        }
        if (element.department == "Writing") {
          this.writing.push(element);
        }
        if (element.department == "Art") {
          this.departments.art.push(element);
        }
        if (element.department == "Sound") {
          this.departments.sound.push(element);
        } else this.departments.other.push(element);
      });
    },

    updateActiveList(option) {
      this.activeList = option;
    }
  },
  computed: {
    totalResults() {
      return this.movies.length;
    },

    arrow() {
      return this.sortedDescending == true ? "\u2193" : "\u2191";
    },
    listToShow() {
      if (this.activeList == "acting") {
        return this.movies.cast; 
      } 
      
      
      
      
      
      else return "nothing";
    }
  }
};
</script>

<style scoped>
.active {
  color: yellow !important;
}
.active:hover {
  cursor: default;
}

.sort-buttons-row,
.department-row {
  width: 100%;
  background: linear-gradient(
    0deg,
    rgba(99, 82, 161, 1) 0%,
    rgba(133, 111, 214, 1) 50%
  );
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sort-buttons-row {
  border-radius: 15px 15px 0 0;
}

.department-row {
}

.sort-button {
  color: white;
  display: flex;
  justify-content: space-between;
  width: 140px;
  max-width: 100%;
  font-weight: bolder;
  border-right: 1px solid rgba(227, 227, 240, 0.3);
  padding: 1rem;
}

.sort-button:hover,
.display-button:hover {
  cursor: pointer;
}

.row-left,
.row-right {
  display: flex;
}
.display-button {
  margin: 1rem;
  color: rgb(216, 216, 216);
  font-size: 1.4rem;
}
</style>


, , , , , , , , , , , , , 
default: 