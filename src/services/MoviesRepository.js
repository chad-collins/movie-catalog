import Repository from "./Repository.js";

const key = "api_key=" + process.env.VUE_APP_TMDB_API_KEY;
const append = "&append_to_response=";
export default {
  getById(id) {
    return Repository.get(`movie/${id}?${key}${append}credits`);
  },
  getByName(name) {
    return Repository.get(`/search/movie?${key}&query=${name}&language=en-US`)},

  getImagesById(id) {
    return Repository.get(`movie/${id}/images?${key}`);
  },
  getVideoById(id) {
    return Repository.get(`movie/${id}/videos?${key}`);
  },
  getSimilarById(id) {
    return Repository.get(`movie/${id}/similar?${key}`);
  },
  getReviewsById(id) {
    return Repository.get(`movie/${id}/reviews?${key}&page=1`);
  },
  getUpcoming() {
    return Repository.get(`movie/now_playing?${key}`);
  },

  getTrending() {
    return Repository.get(
      `discover/movie?${key}&with_release_type=2|3&region=US${append}videos`
    );
  },
  getNinetiesAction() {
    return Repository.get(
      `discover/movie?${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=1990-01-01&primary_release_date.lte=1999-12-31&vote_average.gte=6&with_genres=28${append}videos`
    );
  },

  getGenres(){
    return Repository.get(
      `genre/movie/list?${key}&language=en-US`
    )
  },
  getMovies(sort, genre, page){
    return Repository.get(
      `discover/movie?${key}&language=en-US&sort_by=${sort}&include_adult=false&include_video=false&primary_release_date.gte=1990-01-01&primary_release_date.lte=1999-12-31&vote_average.gte=6&with_genres=${genre}&page=${page}`)}
  
   
  
};
