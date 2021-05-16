<template>
    <div>
        <b-modal id="modal-1" title="BootstrapVue">
    <p class="my-4" v-for="event in eventsOnThisDay" :key="event.id">{{event.eventName}}</p>
  </b-modal>
    </div>
</template>
<script>
import Events from '../Events';
export default {
  name: 'DayEvents',
  props: {
    date: {
      type: String,
      default: ""
    },
    eventsOnThisDay: [],
  },

  async created() {
    this.eventsOnThisDay = await Events.getDayEvents(this.date)
  },
}
</script>
<style lang="">
    
</style>