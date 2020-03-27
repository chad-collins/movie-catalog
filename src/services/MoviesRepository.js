
import Repository from "./Repository.js"



const resource = 'movie?api_key=' + process.env.VUE_APP_TMDB_API_KEY;
export default {
  getTrending() {
    return Repository.get(`${resource}'&with_release_type=2|3&region=US&append_to_response=videos'`);
  },
  getNinetiesAction() {
    return Repository.get(`${resource}'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=1990-01-01&primary_release_date.lte=1999-12-31&vote_average.gte=6&with_genres=28&append_to_response=videos'`);
  }
};