export default {
  LOAD_MOVIES: (state, payload) => {
    state.movies = payload;
  },
  LOAD_CATEGORIES: (state, payload) => {
    state.categories = payload;
  },
  LOAD_TYPES: (state, payload) => {
    state.types = payload;
  },
  TOGGLE_DIALOG: (state) => {
    state.dialog = !state.dialog;
  },
  TOGGLE_LOADING: (state) => {
    state.loading = !state.loading;
  },
  APPEND_MOVIE_TO_CART: (state, payload) => {
    state.selectedMovies = state.selectedMovies.concat([payload]);
  },
  CLEAR_CART: (state) => {
    state.selectedMovies = [];
  }
};