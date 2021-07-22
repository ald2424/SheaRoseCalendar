<template>
  <v-form @submit.prevent="addEvent">
    <v-select :items="types" v-model="type" label="type (required)"></v-select>
    <v-text-field v-model="details" type="text" label="detail"></v-text-field>
    <v-text-field v-model="startTime" type="time" label="start (required)"></v-text-field>
    <!-- <vue-timepicker v-model="start" format="h:m a" :minute-interval="15" placeholder="Start Time"></vue-timepicker> -->
    <v-text-field v-model="endTime" type="time" label="end (required)"></v-text-field>
    <!-- <vue-timepicker v-model="end" format="h:m a" :minute-interval="15" placeholder="End Time"></vue-timepicker> -->
   <v-text-field v-model="instructor" type="text" label="instructor (required)"></v-text-field>
   <v-checkbox v-model="repeat" label="repeat every week"></v-checkbox>
   <v-text-field v-if="repeat == true" v-model="repeatUntil" type="date" label="repeat until"></v-text-field>
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
    startTime: null,
    endTime: null,
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
    repeat: false,
    repeatUntil: null,
    start: null,
    end: null
  }),
  methods: {
    async addEvent() {
      if (this.startTime && this.endTime) {
        
        let fullDateStart = this.date + " " + this.startTime
        let fullDateEnd = this.date + " " + this.endTime

        await Events.insertEvent(
          this.type,
          this.details,
         // fullDateStart,
         // fullDateEnd,
         this.startTime,
         this.endTime,
          this.date,
          this.instructor,
          this.repeat,
          this.repeatUntil,
          fullDateStart,
          fullDateEnd
        );
        this.type = "";
        this.details = "";
        this.startTime = "";
        this.endTime = "";
        this.instructor = "";
        this.repeat = false
        this.repeatUntil = "";

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
