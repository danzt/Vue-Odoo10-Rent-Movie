import {Model} from 'odoo-webkit';

const Movie = new Model('mr.movie');
const Type = new Model('mr.type');
const Category = new Model('mr.category');
const Rental = new Model('mr.rental');

export default {
  loadMovies({commit, dispatch}) {
    Movie.all().then(res => commit('LOAD_MOVIES', res.records))
  },

  loadCategories({commit}) {
    Category.all().then(res => commit('LOAD_CATEGORIES', res.records));
  },
  loadTypes({commit}) {
    Type.all().then(res => commit('LOAD_TYPES', res.records));
  },
  createCategory() {
    /*Category.create({name: 'Aventura'}).then(console.log);
    Category.create({name: 'Ciencia Ficcion'}).then(console.log);
    Category.create({name: 'XXX'}).then(console.log);
    Category.create({name: 'Infantil'}).then(console.log);*/
  },
  createType() {
    /*Type.create({name: 'Digital'}).then(console.log);
    Type.create({name: '3D'}).then(console.log);
    Type.create({name: 'BlueRay'}).then(console.log);
    Type.create({name: '4D'}).then(console.log);*/
  },
  createMovie({dispatch, commit}, movie) {
    movie.category_ids = [[6, false, movie.categorys]];
    movie.type_ids = [[6, false, movie.types]];

    Movie.create(movie).then(res => {
      dispatch('loadMovies');
      dispatch('toggleDialog');
    });
  },
  toggleDialog({commit}) {
    commit('TOGGLE_DIALOG');
  },
  searchMovie({commit}, searchData) {
    const TMovie = new Model('mr.movie');
    commit('TOGGLE_LOADING');
    TMovie.filter(['name', 'ilike', searchData])
      .get()
      .then(res => {
        setTimeout(() => {
          commit('LOAD_MOVIES', res.records);
          commit('TOGGLE_LOADING');
        }, 500);
      });
  },

  appendMovieToCart({commit}, movie) {
    if (confirm('Desea Alquilar esta pelicula?')) {
      commit('APPEND_MOVIE_TO_CART', movie);
    }
  },
  processRental({state, commit}) {
    if (confirm('Desea procesar el alquiler?')) {
      const list_movies = state.selectedMovies;
      const movie_ids = list_movies.map(movie => movie.id);
      let data = {};

      data['user_id'] = 1;
      data['movie_ids'] = [[6, false, movie_ids]]

      Rental.create(data).then(res=> {
        commit('CLEAR_CART');
      });
    }
  }
};