
import MoviesRepository from "./MoviesRepository"
import ActorsRepository from "./ActorsRepository";
import SearchRepository from './SearchRepository';


const repositories = {
    movies: MoviesRepository,
    actors: ActorsRepository,
    search: SearchRepository

}

export const RepositoryFactory = {
    get: name => repositories[name]
};