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
    return Repository.get(`person/${id}/movie_credits?${key}`);
  },
  getPopular() {
    return Repository.get(
      `person/popular?${key}&adult=false&original_language=en-US`
    );
  },
  getByName(name) {
    return Repository.get(`/search/person?${key}&query=${name}`);
  }
};
