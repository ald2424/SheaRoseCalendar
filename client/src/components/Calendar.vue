<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn color="red darken-2" dark @click.stop="dialog = true">
            New Event
          </v-btn>
          <v-btn outlined class="mr-4" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-btn fab text small @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <div class="flex-grow-1"></div>
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn outlined v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-container>
            <!-- <DayEvents v-if="showDayEvents" :date="focus"></DayEvents> -->
            <!-- <CreateEvent v-else-if="showCreateEvent" :date="focus" @close="saveEvent"></CreateEvent> -->
            <CreateEvent v-if="showCreateEvent" :date="focus" @close="saveEvent"></CreateEvent>
          </v-container>
        </v-card>
      </v-dialog>

<v-sheet height="1000">
  <v-calendar
  ref="calendar"
  v-model="focus"
  :now="today"
  :type="type"
  :events="events"
  event-color="red darken-2"
  @click:event="showEvent"
  @click:more="viewDay"
  @click:date="setDialogDate"
  @change="updateRange"
  >
      <template v-slot:event="{ event }">
        {{event.types}} {{event.details}}
      </template>
    
  </v-calendar>
  <v-menu
  v-model="selectedOpen"
  :close-on-content-click="false"
  :activator="selectedElement"
  full-width
  offset-x
  >
  <v-card color="grey lighten-4" :width="350" flat>
    <v-toolbar :color="selectedEvent.color" dark>
      <v-btn @click="deleteEvent(selectedEvent._id)" icon>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-toolbar-title v-html="selectedEvent.types + ' ' + selectedEvent.details"></v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>

    <v-card-text>
      <form v-if="currentlyEditing !== selectedEvent._id">
        {{selectedEvent.notes}}
      </form>
      <form v-else>
        <textarea-autosize
        v-model="selectedEvent.details"
        type="text"
        style="width: 100%"
        :min-height="100"
        placeholder="add note">
      </textarea-autosize>
    </form>
  </v-card-text>

  <!-- <v-card-actions>
    <v-btn text color="secondary" @click="selectedOpen = false">
      close
    </v-btn>
    <v-btn v-if="currentlyEditing !== selectedEvent._id" text @click.prevent="editEvent(selectedEvent)">
      edit
    </v-btn>
    <v-btn text v-else type="submit" @click.prevent="updateEvent(selectedEvent)">
      Save
    </v-btn>
  </v-card-actions> -->
</v-card>
</v-menu>
</v-sheet>
</v-col>
</v-row>
</template>

<script>
import { db } from '@/main'
import Events from '../Events';
//import DayEvents from './EventsOfTheDay';
import CreateEvent from './CreateEvent';
// import VueTimepicker from 'vue2-timepicker';
// import 'vue2-timepicker/dist/VueTimepicker.css'
export default {
  data: () => ({
    today: new Date().toLocaleDateString('fr-ca'),
    focus: new Date().toLocaleDateString('fr-ca'),
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
  
     start: null,
     end: null,
    //color: '#1976D2', // default event color
    currentlyEditing: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    dialog: false,
    dialogDate: false,
    sameDayEvents: [],
    selectedDate: null,
    dateForProp: null,
  }),
   components: { CreateEvent },
  async created(){
   this.getEvents();
  },
  computed: {
    title () {
      const { start, end } = this
      if (!start || !end) {
        return ''
      }
      const startMonth = this.monthFormatter(start)
      const endMonth = this.monthFormatter(end)
      const suffixMonth = startMonth === endMonth ? '' : endMonth
      const startYear = start.year
      const endYear = end.year
      const suffixYear = startYear === endYear ? '' : endYear
      const startDay = start.day + this.nth(start.day)
      const endDay = end.day + this.nth(end.day)
      switch (this.type) {
        case 'month':
        return `${startMonth} ${startYear}`
        case 'week':
        case '4day':
        return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
        case 'day':
        return `${startMonth} ${startDay} ${startYear}`
      }
      return ''
    },
    monthFormatter () {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC', month: 'long',
      })
    }
  },
  methods: {
    async getEvents(){
      try{
      this.events = await Events.getEvents()
    }catch(err){
      this.error = err.message;
    }
    },
     showCreateEvent(){
      if(this.dialogDate == true){
        return true;
        }
        else{
          return false;
        }
      },
      saveEvent(){
      this.dialogDate = false;
      this.dialog = false;
      this.getEvents();
    },
    getEventsOnThisDate(){
      this.events.forEach(element => {
        if (element.date == this.focus){
          this.sameDayEvents.push(element)
        }
      });
    },
    setDialogDate( { date }) {
      this.sameDayEvents = []
      this.dialogDate = true
      this.focus = date
      this.type = 'day'
      //this.getEventsOnThisDate()
    },
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    setToday () {
      this.focus = this.today
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    editEvent (ev) {
      this.currentlyEditing = ev._id
    },
    async updateEvent (ev) {
      await db.collection('calEvent').doc(this.currentlyEditing).update({
        details: ev.details
      })
      this.selectedOpen = false,
      this.currentlyEditing = null
    },
    async deleteEvent (ev) {
     await Events.deleteEvent(ev)
      this.selectedOpen = false
     this.getEvents()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => this.selectedOpen = true, 10)
      }
      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }
      nativeEvent.stopPropagation()
    },
    updateRange ({ start, end }) {
      this.start = start
      this.end = end
    },
    nth (d) {
      return d > 3 && d < 21
      ? 'th'
      : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
    }
  },
  watch:{
    events: function(val){
      val.forEach(event =>{
        if(event.details == null){
          event.details = "";
        }
      })
    },
    end(){
      const that = this
      setTimeout(function(){
      if(that.end < that.start){
        alert('Invalid start and end times. Make sure that the end time is later than the start time.')
        that.end = null
      }
      }, 4000)
    }
  }
}
</script>
