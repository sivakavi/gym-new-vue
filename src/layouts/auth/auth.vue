<template>
  <q-layout> <!-- Be sure to play with the Layout demo on docs -->
    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { eventHub } from '../../services/shared/eventHub.js'
export default {
  name: 'LayoutAuth',
  data () {
    return {
      leftDrawer: true
    }
  },

  methods: {
    showSpinner(){
      this.$q.loading.show();
    },

    hideSpinner(){
      setTimeout(()=>{
        this.$q.loading.hide();
      }, 500);
    },

  },

  created(){
    eventHub.$on('before-request', this.showSpinner);
    eventHub.$on('request-error',  this.hideSpinner);
    eventHub.$on('after-response', this.hideSpinner);
    eventHub.$on('response-error', this.hideSpinner);
  },

  beforeDestroy(){
    eventHub.$off('before-request', this.showSpinner);
    eventHub.$off('request-error',  this.hideSpinner);
    eventHub.$off('after-response', this.hideSpinner);
    eventHub.$off('response-error', this.hideSpinner);
  },

}
</script>

<style>

</style>
