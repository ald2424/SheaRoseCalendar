<template>
  <v-app>
    <v-app-bar
      app
      color="red darken-2"
      dark
    >
      <div class="d-flex justify-center">
        <v-toolbar-title>Shea Rose Farm Planner</v-toolbar-title>
      </div>
    </v-app-bar>

    <v-main>
      <Calendar/>
    </v-main>
  </v-app>
</template>

<script>
import Calendar from './components/Calendar';

export default {
  name: 'App',

  components: {
    Calendar,
  },

  data: () => ({
    //
  }),
};
</script>
