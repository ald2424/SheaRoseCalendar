<template>
  <v-form @submit.prevent="addEvent">
    <v-text-field v-model="eventName" type="text" label="event name (required)"></v-text-field>
    <v-select :items="types" v-model="type" label="type (required)"></v-select>
    <v-text-field v-model="details" type="text" label="detail"></v-text-field>
    <v-text-field v-model="start" type="time" label="start (required)"></v-text-field>
    <!-- <vue-timepicker v-model="start" format="h:m a" :minute-interval="15" placeholder="Start Time"></vue-timepicker> -->
    <v-text-field v-model="end" type="time" label="end (required)"></v-text-field>
    <!-- <vue-timepicker v-model="end" format="h:m a" :minute-interval="15" placeholder="End Time"></vue-timepicker> -->
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
    eventName: null,
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
  }),
  methods: {
    async addEvent() {
      if (this.eventName && this.start && this.end) {
        await Events.insertEvent(
          this.eventName,
          this.type,
          this.details,
          this.start,
          this.end,
          this.date
        );
        console.log(`name: ${this.eventName},
          type: ${this.type},
          details: ${this.details},
          start: ${this.start},
          end: ${this.end},
          date: ${this.date}`);

        (this.eventName = ""),
          (this.type = ""),
          (this.details = ""),
          (this.start = ""),
          (this.end = "");
      } else {
        alert("You must enter event name, start, and end time");
      }
    }
  }
};
</script>
