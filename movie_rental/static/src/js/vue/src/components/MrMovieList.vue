<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs2 v-for="movie in data"
              :key="movie.id">
        <mr-movie-card :movie="movie"/>
      </v-flex>
      <v-flex v-if="mode === 'search' && data.length === 0">
        <v-alert :value="true" type="warning">
          No existen peliculas!
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import MrMovieCard from './MrMovieCard';

  const MODE_NORMAL = 'normal';
  const MODE_SEARCH = 'search';

  export default {
    name: "mr-movie-list",
    components: {
      MrMovieCard
    },
    props: {
      data: {
        type: Array,
        default: [],
        required: true
      },
      mode:{
        type: String,
        default: MODE_NORMAL
      }
    }
  }
</script>

<style scoped>

</style>