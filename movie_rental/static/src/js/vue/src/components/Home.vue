<template>
  <v-app id="inspire">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="blue darken-3"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Movie Rental</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down"
        @input="realTimeSearch"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon @click="toggleDialogCart(true)">
        <v-icon>shopping_cart</v-icon>
      </v-btn>
      <v-btn icon large>
        <div v-if="loading">
          <v-progress-circular indeterminate color="white"></v-progress-circular>
        </div>
        <div v-if="!loading">
          <v-avatar size="32px" tile>
            <img
              src="https://vuetifyjs.com/static/doc-images/logo.svg"
              alt="Vuetify"
            >
          </v-avatar>
        </div>
      </v-btn>
    </v-toolbar>
    <v-content>
      <mr-movie-list :data="movies" :mode="modeView"/>
    </v-content>
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click.stop="toggleDialog()"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog :value="dialog" width="800px">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          Create movie
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-avatar size="40px" class="mr-3">
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt=""
                  >
                </v-avatar>
                <v-text-field
                  placeholder="Name"
                  v-model="newMovie.name"
                  v-validate="'required'"
                  data-vv-name="name"
                  :rules="getMessages('name')"
                  :validate-on-blur="true"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="business"
                placeholder="Description"
                v-model="newMovie.descripcion"
                v-validate="'required'"
                data-vv-name="description"
                :rules="getMessages('description')"
                :validate-on-blur="true"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-select
                v-model="newMovie.categorys"
                :items="categories"
                item-value="id"
                item-text="name"
                label="Category"
                multiple
                chips
                prepend-icon="category"
                hint="Select Category"
                persistent-hint
                v-validate="'required'"
                data-vv-name="categories"
                :error-messages="getMessages('categories')"
                :validate-on-blur="true"
              ></v-select>
            </v-flex>
            <v-flex xs12>
              <v-select
                v-model="newMovie.types"
                :items="types"
                item-text="name"
                item-value="id"
                label="Type"
                multiple
                chips
                prepend-icon="art_track"
                hint="Select Type"
                persistent-hint
                :validate-on-blur="true"
                v-validate="'required'"
                data-vv-name="types"
                :error-messages="getMessages('types')"
              ></v-select>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="newMovie.year"
                prepend-icon="date_range"
                placeholder="Year"
                data-vv-name="year"
                v-validate="'required|numeric'"
                :rules="getMessages('year')"
                :validate-on-blur="true"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field @focus="setFocusInputFile" prepend-icon="attach_file" label="Choose file"></v-text-field>
              <input ref="inputFile" label="Choose File" @change="manageInput" type="file"/>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="toggleDialog()">Cancel</v-btn>
          <v-btn flat @click="formSave(newMovie)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog :value="dialogCart" width="700" persistent="true">
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title>Selected Movies</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list two-line>
          <template v-for="(movie, index) in selectedMovies">
            <v-list-tile :key="index" avatar @click="">
              <v-list-tile-avatar>
                <img :src="movie.image">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="movie.name"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="toggleDialogCart(false)">Cancel</v-btn>
          <v-btn flat @click="processRental()">Rent</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
  import {mapActions, mapState} from 'vuex';
  import MrMovieList from './MrMovieList';

  export default {
    name: 'home',
    components: {
      MrMovieList
    },
    data: () => ({
      drawer: null,
      items: [
        {icon: 'local_movies', text: 'Movie'}
      ],
      newMovie: {
        name: '',
        descripcion: '',
        categorys: [],
        types: [],
        year: 0,
        image: ''
      },
      search: '',
      modeView: 'normal',
      dialogCart: false

    }),
    props: {
      source: String
    },

    mounted() {
      this.loadCategories();
      this.loadTypes();
      this.loadMovies();
    },

    methods: {
      ...mapActions([
        'loadMovies',
        'loadCategories',
        'loadTypes',
        'createMovie',
        'toggleDialog',
        'searchMovie',
        'processRental'
      ]),
      getMessages(field) {
        return (!this.errors.has(field)) ? [] : [this.errors.first(field)]
      },
      formSave(data) {
        this.$validator.validate().then(result => {
          if (result) {
            this.createMovie(data);
          }
        });
      },
      realTimeSearch(value) {
        this.modeView = (value === '') ? 'normal' : 'search';
        this.searchMovie(value);
      },
      manageInput(event) {
        const files = event.target.files;
        const currentFile = files[0];
        const reader = new FileReader();

        reader.addEventListener("load", () => {
          this.newMovie.image = reader.result.split(',')[1];
        }, false);
        if (currentFile) {
          reader.readAsDataURL(currentFile);
        }
      },
      setFocusInputFile() {
        this.$refs.inputFile.click();
      },
      toggleDialogCart(status) {
        this.dialogCart = status;
      }
    },

    computed: {
      ...mapState(['categories', 'types', 'movies', 'dialog', 'loading', 'selectedMovies'])
    }
  }
</script>

<style scoped>
  input[type=file] {
    position: absolute;
    left: -99999px;
  }
</style>