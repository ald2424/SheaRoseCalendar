<template>
  <v-form @submit.prevent="addEvent">
    <v-select :items="types" v-model="type" label="type (required)"></v-select>
    <v-text-field v-model="details" type="text" label="detail"></v-text-field>
    <v-text-field v-model="start" type="time" label="start (required)"></v-text-field>
    <!-- <vue-timepicker v-model="start" format="h:m a" :minute-interval="15" placeholder="Start Time"></vue-timepicker> -->
    <v-text-field v-model="end" type="time" label="end (required)"></v-text-field>
    <!-- <vue-timepicker v-model="end" format="h:m a" :minute-interval="15" placeholder="End Time"></vue-timepicker> -->
   <v-text-field v-model="instructor" type="text" label="instructor (required)"></v-text-field>
   <v-checkbox v-model="repeat" label="repeat every week"></v-checkbox>
    <v-btn type="submit" color="red darken-2" class="mr-4" @click.stop="dialog = false">create event</v-btn>
  </v-form>
</template>
<script>
import Events from "../Events";
export default {
  name: "CreateEvent",
  props: {
    date: {
      type: String,
      default: ""
    },
    eventsOnThisDay: []
  },
  data: () => ({
    details: null,
    start: null,
    end: null,
    types: [
      "Group",
      "Private",
      "Semi-private",
      "Birthday party",
      "Trail ride",
      "Off-premise event"
    ],
    type: null,
    instructor: null,
    repeat: false
  }),
  methods: {
    async addEvent() {
      if (this.start && this.end) {
        
        let fullDateStart = this.date + " " + this.start
        let fullDateEnd = this.date + " " + this.end

        await Events.insertEvent(
          this.type,
          this.details,
          fullDateStart,
          fullDateEnd,
          this.date,
          this.instructor,
          this.repeat
        );
        this.type = "";
        this.details = "";
        this.start = "";
        this.end = "";
        this.instructor = "";
        this.repeat = false

       this.saveEvent();
     } else {
       alert("You must enter event name, start, and end time");
     }
    },
    saveEvent(){
        this.$emit('close');
    }
  },
};
</script>
