
import MoviesRepository from "./MoviesRepository"
import ActorsRepository from "./ActorsRepository";


const repositories = {
    movies: MoviesRepository,
    actors: ActorsRepository

}

export const RepositoryFactory = {
    get: name => repositories[name]
};