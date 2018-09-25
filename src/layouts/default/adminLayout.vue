<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          class="menu-item"
        >
          <q-icon name="menu" />
          </q-btn>
          <div class="right-menu">
            <div class="progile-view">
              <div class="profile-name">
                <span> {{userName}} </span>
              </div>
              <q-btn-dropdown  class="name-bt" flat round>
                <q-list link>
                   <q-item>
                    <q-item-main>
                      <router-link label to="/">Log Out</router-link>
                    </q-item-main>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
          </div>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <div class="side-menu">
      <q-list class="menu-item"
        no-border
        link
        inset-delimiter
      >
        <q-list-header class="logo-title">Matrix Gym</q-list-header>
        <q-item class="list-items" @click.native="$router.push('/admin/dashboard')">
          <q-item-side icon="dashboard" />
          <q-item-main label="Dashboard"/>
        </q-item>
        <q-item class="list-items" @click.native="$router.push('/admin/subscriptoin-list')">
          <q-item-side icon="list" />
          <q-item-main label="Subscription" />
        </q-item>
        <q-item class="list-items" @click.native="$router.push('/admin/stafflist')">
          <q-item-side icon="group" />
          <q-item-main label="Staff" />
        </q-item>
        <q-item class="list-items" @click.native="$router.push('/admin/customer-list')">
          <q-item-side icon="wc" />
          <q-item-main label="Customer" />
        </q-item>
      </q-list>
      </div>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { eventHub } from '../../services/shared/eventHub.js'
export default {
  name: 'LayoutAdmin',
  data () {
    return {
      search: '',
      leftDrawerOpen: this.$q.platform.is.desktop,
      picture: './statics/images.png',
      userName: ''
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
    let userDetail = JSON.parse(localStorage.userDetail)
    this.userName = userDetail.name   
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
