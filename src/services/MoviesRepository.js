import Repository from "./Repository.js";

const key = "api_key=" + process.env.VUE_APP_TMDB_API_KEY;
const append = "&append_to_response=";
const region = "&region=US&language=en-US"
const adult = "&include_adult=false"
export default {
  getById(id) {
    return Repository.get(`movie/${id}?${key}${region}${append}credits,release_dates,status,video`);
  },
  getImagesById(id) {
    return Repository.get(`movie/${id}/images?${key}`);
  },
  getVideoById(id) {
    return Repository.get(`movie/${id}/videos?${key}`);
  },
  getSimilarById(id) {
    return Repository.get(`movie/${id}/similar?${key}`);
  },

  getByCategory(category, pageNum) {
    return Repository.get(`movie/${category}?${key}${region}&page=${pageNum}`)

  },


  getNinetiesAction() {
    return Repository.get(
      `discover/movie?${key}${region}&sort_by=popularity.desc${adult}&include_video=false&page=1&primary_release_date.gte=1990-01-01&primary_release_date.lte=1999-12-31&vote_average.gte=6&with_genres=28${append}videos`
    );
  },

  getGenres() {
    return Repository.get(
      `genre/movie/list?${key}${region}`
    )
  },
 
};
