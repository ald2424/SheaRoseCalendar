<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div id="app">
      <!-- <v-calendar is-expanded></v-calendar> -->
      <v-date-picker is-expanded v-model="selectedDate" />
    </div>
  </div>
</template>

<script>
export default {
  name: "CalendarComponent",
  props: {
    msg: String
  },
  days: []
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
