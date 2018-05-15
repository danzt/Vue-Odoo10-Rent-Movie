<template>
  <v-card color="blue-grey darken=2">
    <v-card-media
      :src="renderImage(movie)"
      height="200px">
      <v-container fill-height fluid>
        <v-layout fill-height>
          <v-flex xs12 align-end flexbox>
            <span class="headline white--text" v-text="movie.name"></span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-media>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat dark @click="appendMovieToCart(movie)">
        <v-icon right dark>check_circle</v-icon>
        Rent
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  import {mapActions} from 'vuex'
  export default {
    name: 'mr-movie-card',
    props: {
      movie: {
        type: Object,
        required: true
      }
    },
    methods:{
      ...mapActions(['appendMovieToCart']),
      renderImage(movie){
        if(movie.image){
          return `/web/image?model=mr.movie&id=${movie.id}&field=image`;
        }
        return 'https://www.euroresidentes.com/suenos/img_suenos/pelicula-suenos-euroresidentes.jpg'
      }
    }
  }
</script>
