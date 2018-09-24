<template>
  <q-page padding>
    <div class="page-view">
       <div class="page-titles">
        <h3>Add Subscripton <q-btn round color="black" @click="goBack" style="float:right;" icon="keyboard_backspace" /></h3>
      </div>
       <!-- Doctor list -->
      <q-card>
        <q-card-title class="card-header">
          Subscriptoin Information
        </q-card-title>
        <q-card-separator />
        <q-card-main>
            <div class="form-body">
              <div class="form-group">
                <div class="row gutter-sm">
                  <div class="col-md-3">
                    <label class="control-label">Name</label>
                  </div>
                <div class="col-md-5">
                  <q-input class="form-input" v-model="subscriptionName"/>
                  <span class="form-group__error" v-if="$v.subscriptionName.$error && !$v.subscriptionName.required">Field is required.</span>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row gutter-sm">
                <div class="col-md-3">
                  <label class="control-label">Amount</label>
                </div>
                <div class="col-md-5">
                  <q-input class="form-input" v-model="subscriptionAmount"/>
                  <span class="form-group__error" v-if="$v.subscriptionAmount.$error && !$v.subscriptionAmount.required">Field is required.</span>
                  <span class="form-group__error" v-if="$v.subscriptionAmount.$error && !$v.subscriptionAmount.numericWithDot">Accept numeric value only.</span>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row gutter-sm">
                <div class="col-md-3">
                  <label class="control-label">Duration (Months)</label>
                </div>
                <div class="col-md-5">
                  <q-select class="form-input" v-model="subscriptionDuration" :options="subscriptionDurationOptions"/>
                  <span class="form-group__error" v-if="$v.subscriptionDuration.$error && !$v.subscriptionDuration.required">Field is required.</span>
                </div>
              </div>
            </div>
             
            <div class="row gutter-sm">
              <div class="col-md-3">
              </div>
              <div class="col-md-5">
                 <q-btn @click="createSubscription" class="add-btn">Create Subscription</q-btn>
              </div>
            </div>
          </div>
        </q-card-main>
      </q-card>
    </div>
    
  </q-page>
</template>

<script>

import api from 'src/services/api/api';

import { 
    required, 
    email,
    minLength,
    maxLength,
    numeric,
    alpha
} from 'vuelidate/lib/validators'

import {
  alphaWithSpaceDot,
  alphaWithSpace,
  alphaWithDot,
  alphaNumericWithSpaceDot,
  alphaNumericWithSpace,
  alphaNumericWithDot,
  alphaNumericWithSpaceHyphen,
  numericWithDot
} from 'src/services/shared/customValidation.js'

export default {

  name: 'AddSubscription',
  
  data () {
    return {
      subscriptionName: '',
      subscriptionAmount: '',
      subscriptionDuration: '',
      subscriptionDurationOptions:[
        {
          label: '1',
          value: '1'
        },
        {
          label: '2',
          value: '2'
        },
        {
          label: '3',
          value: '3'
        },
        {
          label: '4',
          value: '4'
        },
        {
          label: '5',
          value: '5'
        },
        {
          label: '6',
          value: '6'
        },
        {
          label: '7',
          value: '7'
        },
        {
          label: '8',
          value: '8'
        },
        {
          label: '9',
          value: '9'
        },
        {
          label: '10',
          value: '10'
        },
        {
          label: '11',
          value: '11'
        },
        {
          label: '12',
          value: '12'
        }
      ],
    }
  },

  validations(){
      return {
            subscriptionName:{
              required
            },
            subscriptionAmount:{
              required,
              numericWithDot
            },
            subscriptionDuration:{
              required
            },
      }
  },

  methods:{

    createSubscription(){
      this.$v.subscriptionName.$touch()
      this.$v.subscriptionAmount.$touch()
      this.$v.subscriptionDuration.$touch()
      if (this.$v.subscriptionName.$error || this.$v.subscriptionAmount.$error || this.$v.subscriptionDuration.$error) {
        this.$q.notify({
          position: "top",
          message: "Please review fields again."
        })
        return
      }
      
      let self = this
      let requestData = {
        name: this.subscriptionName,
        amount: this.subscriptionAmount,
        duration: this.subscriptionDuration
      }
      
      api
        .post("subscriptions", requestData)
        .then(function (response) {
          self.$q.notify({
              position: "top",
              timeout: 2000,
              type: 'positive',
              message: response.data.message
          })
          self.subscriptionName = ''
          self.subscriptionAmount = ''
          self.subscriptionDuration = ''
          self.$v.subscriptionName.$reset()
          self.$v.subscriptionAmount.$reset()
          self.$v.subscriptionDuration.$reset()
        })
        .catch(function (error) {
          self.$q.notify({
              position: "top",
              timeout: 2000,
              message: 'Something went wrong !!'
          })
        });
    },

    goBack(){
      this.$router.push('/admin/subscriptoin-list')
    },

  },
 
}
</script>

<style>

</style>

