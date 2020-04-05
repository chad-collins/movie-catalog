import Repository from "./Repository.js";

const key = "api_key=" + process.env.VUE_APP_TMDB_API_KEY;

export default {

    searchByPerson(query) {
        return Repository.get(`/search/person?${key}&query=${query}&language=en-US`);
    },
    searchByMovie(query) {
        return Repository.get(`/search/movie?${key}&query=${query}&language=en-US`)
    },
    searchByMulti(query) {
        return Repository.get(`/search/multi?${key}&query=${query}&language=en-US`)
    },

};
