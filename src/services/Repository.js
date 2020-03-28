
import axios from 'axios'

const baseDomain = 'https://api.themoviedb.org/3';
const baseURL =  `${baseDomain}`


export default axios.create({
  baseURL,
  headers: { 'Authorization': `Bearer ` + process.env.VUE_APP_TMDB_READ_ACCESS_TOKEN,
              'Content-Type': `application/json;charset=utf-8`

}
}
);          