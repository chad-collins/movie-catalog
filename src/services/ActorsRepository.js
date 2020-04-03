import Repository from "./Repository.js";

const key = "api_key=" + process.env.VUE_APP_TMDB_API_KEY;

export default {
  getById(id) {
    return Repository.get(`person/${id}?${key}`);
  },
  getImagesById(id) {
    return Repository.get(`person/${id}/images?${key}`);
  },
  getActingCredits(id) {
    return Repository.get(`person/${id}/movie_credits?${key}&sort_by=popularity.desc`);
  },
  
  getPopular() {
    return Repository.get(
      `person/popular?${key}&language=en-US&page=1`
    );
  },
  getByName(name) {
    return Repository.get(`/search/person?${key}&query=${name}`);
  }
};
