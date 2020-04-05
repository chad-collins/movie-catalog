<template>
  <div id="the-navbar-search"
  v-on:keyup.27="$emit('close')">
    <div class="container">
      <div class="row">
        <div class="input-bar row-content">
          <font-awesome-icon class="search-icon" icon="search" />
          <input
            ref="search"
            type="text"
            placeholder="Movie Title or Actor Name"
            v-model="query"
            v-on:input="runSearch(query)"
            v-on:delete="runSearch(query)"
          />
        </div>
      </div>
      <div class="row" v-for="result in filteredResults" :key="result.id">
        <div class="row-content">
          <figure>
            <img :src="'https://image.tmdb.org/t/p/w45' + result.profile_path" alt />
          </figure>

          <!--Movie Result -->
          <router-link
            v-if="result.media_type == 'movie'"
            :to="{ 
            name: 'movie', 
            params: { 
                id: result.id,
            } 
        }"
          >
            <p class="result--title" v-if="result.media_type == 'movie'">
              {{result.title}} </p>
              <p class="result--date">({{result.release_date | year}})</p>
              <small>in movies</small>
            
          </router-link>

          <!--Person Result -->

          <div
            class="result"
            v-if="result.media_type == 'person' && result.known_for_department == 'Acting'"
          >
            <router-link
              :to="{ 
              name: 'person', 
              params: { 
              id: result.id,
              } 
            }"
            >
              <p class="result--title">
                {{result.name}}
                <span>
                  <small>in people</small>
                </span>
              </p>
            </router-link>

            <ul class="result--info">
              <li class="result--known-for" v-for="media in result.known_for" :key="media.id">
                <small>{{media.title}}</small>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RepositoryFactory } from "../services/RepositoryFactory.js";
const searchRepository = RepositoryFactory.get("search");
export default {
  data() {
    return {
      query: "",
      results: []
    };
  },
  mounted(){
    this.focusInput()
  },

  methods: {
    focusInput(){this.$refs.search.focus()},
    async runSearch() {
      if (this.query.length > 2) {
        const { data } = await searchRepository.searchByMulti(this.query);
        this.results = data.results;
      }
      if (this.query.length < 2) {
        this.movies = "";
        this.actors = "";
      }
    }
  },
  computed: {
    filteredResults() {
      const list = this.results.filter(
        item =>
          item.known_for_department == "Acting" || item.media_type == "movie"
      );

      return list;
    }
  }
};
</script>

<style scoped>
#the-navbar-search {
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100%;
}
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
}

.row {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid gray;
  width: 100%;
  padding: 0.5rem 0;
}
.row-content {
  padding: 0 1rem;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1200px;
}

.result {
  display: flex;
  flex-direction: column;
}

input {
  text-transform: uppercase;
  width: 100%;
  color: rgba(99, 82, 161, 1);
  font-size: 1.6rem;
  height: 50px;
  padding: 0 1rem;
  background: none;
  border: none;
}

input::placeholder {
  font-size: initial;
  text-transform: initial;
  color: gray;
}

.search-icon {
  color: white;
  padding: 5px;
  font-size: 2rem;
  border-radius: 20%;
  background-color: rgba(99, 82, 161, 1);
}

.result--title {
  color: rgba(99, 82, 161, 1);
  font-weight: 600;
}
.result--date{
  color: gray;
}
.result--known-for {
  font-weight: initial;
  color: gray;
}

small {
  font-weight: initial;
  text-indent: 0.5rem;
  color: gray;
}
figure {
  margin-right: 0.5rem;
}

li {
  
  margin-left: 1rem;
}
</style>