<template>
  <v-form @submit.prevent="repeatEvent">
    <v-select :items="types" v-model="type" label="type (required)"></v-select>
    <v-text-field
      v-if="type !== 'Private'"
      v-model="details"
      type="number"
      label="How many horses?"
    ></v-text-field>
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
    end: null,
    fullDateStart: null,
    fullDateEnd: null,
    ofDetails: null,
    theDate: null,
  }),
  methods: {
    repeatEvent() {
      if (this.startTime && this.endTime) {
        this.fullDateStart = this.date + " " + this.startTime;
        this.fullDateEnd = this.date + " " + this.endTime;
        
        if (this.details !== null) {
          this.ofDetails = "of " + this.details;
        } else {
          this.ofDetails = this.details;
        }

        this.theDate = this.date
        console.log("this.theDate: " + this.theDate)
        let t = new Date().toLocaleDateString("en-CA");
        let newDate = this.date 
        let firstDay = true;
        if (this.repeat == true  && t < this.repeatUntil) {
          //get the week before the repeatUntil date
          this.repeatUntil = new Date(this.repeatUntil);
          this.repeatUntil = this.repeatUntil.setDate(
            this.repeatUntil.getDate() - 7
          );

          while (new Date(newDate) <= new Date(this.repeatUntil)) {
            let x = new Date(newDate);

            if(firstDay == true){
              firstDay = false
              newDate = x.setDate(x.getDate() + 1);
            }else{
            newDate = x.setDate(x.getDate() + 8);
            }
            newDate = new Date(newDate)
              .toLocaleDateString("en-CA")
              .slice(0, 10)
              .replace(",", "");
            this.theDate = newDate;
            this.fullDateStart = newDate + " " + this.startTime;
            this.fullDateEnd = newDate + " " + this.endTime;
            this.addEvent();
          }
        } else {
          this.addEvent();
        }
      } else {
        alert("You must enter event name, start, and end time");
      }
    },
    async addEvent() {
      await Events.insertEvent(
        this.type,
        this.ofDetails,
        this.startTime,
        this.endTime,
        this.theDate,
        this.instructor,
        this.repeat,
        this.repeatUntil,
        this.fullDateStart,
        this.fullDateEnd
      );
      this.type = "";
      this.details = "";
      this.startTime = "";
      this.endTime = "";
      this.instructor = "";
      this.repeat = false;
      this.repeatUntil = "";

      this.saveEvent();
    },
    saveEvent() {
      this.$emit("close");
    }
  }
};
</script>
