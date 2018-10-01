<template>
  <q-page padding>
    <div class="page-view">
       <div class="page-titles">
        <h3>Subscription</h3>
      </div>
      <router-link class="add-btn" to="/admin/create-subscription">Add Subscription</router-link>
      <q-card>
        <q-card-title class="card-header">
          Subscription List
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <q-table :data="subscriptionList" :columns="subscriptionColumns" :hide-bottom=true row-key="name" class="table-view">
             <q-tr slot="body" slot-scope="props" :props="props">
              <q-td key="name" :props="props" >
                 {{props.row.name}}
              </q-td>
              <q-td key="amount" :props="props" >
                 {{props.row.amount | showPrice}}
              </q-td>
              <!-- <q-td key="duration" :props="props" >
                 {{(props.row.duration =='1' || props.row.duration ==1) ? props.row.duration+' Month' : props.row.duration+' Months'}}
              </q-td> -->
              <q-td key="duration" :props="props" >
                 {{props.row.duration}}
              </q-td>
              <q-td key="status" :props="props" >
                <subscription-status :status="props.row.is_active"></subscription-status>
              </q-td>
              <q-td key="action" :props="props" >
                <q-btn round color="amber" text-color="black" icon="edit" @click="editSubscription(props.row)"><q-tooltip v-if="$q.platform.is.desktop">Edit Subscription</q-tooltip></q-btn>
                &nbsp;
                <q-btn v-if="props.row.is_active == '0' || props.row.is_active == 0" round color="positive" text-color="black" icon="visibility" @click="changeSubscriptionStatus(props.row , 'e')"><q-tooltip v-if="$q.platform.is.desktop">Enable Subscription</q-tooltip></q-btn>
                <q-btn v-if="props.row.is_active == '1' || props.row.is_active == 1" round color="negative" text-color="black" icon="visibility_off" @click="changeSubscriptionStatus(props.row, 'd')"><q-tooltip v-if="$q.platform.is.desktop">Disable Subscription</q-tooltip></q-btn>
              </q-td>
             </q-tr>
          </q-table>
        </q-card-main>
      </q-card>
    </div>

    <q-modal no-esc-dismiss no-backdrop-dismiss class="smart-model-view" v-model="subscriptionEdit" :content-css="{ minWidth: '50vw'}">
      <q-card>
        <q-card-title class="model-header">
          <div class="model-title">Subscription Edit</div>
          <q-btn @click="subscriptionEdit = false" flat icon="clear" class="header-btn" color="white" slot="right"></q-btn>
        </q-card-title>
      <q-card-main class="model-main">
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
                </div>
              </div>
            </div>
             
            <div class="row gutter-sm">
              <div class="col-md-3">
              </div>
              <div class="col-md-5">
                 <q-btn @click="updateSubscription" class="add-btn">Update</q-btn>
              </div>
            </div>
          </div>
        
      </q-card-main>
      <q-card-actions class="model-footer">
        <div>
          
        </div>
      </q-card-actions>
      </q-card>
    </q-modal>    
  </q-page>
</template>

<script>

import api from 'src/services/api/api'
import SubscriptionStatus from 'src/components/subscriptionStatus'
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

  name: 'SubscriptionList',
  
  components: {
    SubscriptionStatus
  },
  
  data () {
    return {
      subscriptionList: [],
      subscriptionColumns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
        },
        {
          name: 'amount',
          required: true,
          label: 'Amount',
          align: 'left',
        },
        {
          name: 'duration',
          required: true,
          label: 'Duration (Months)',
          align: 'left',
        },
        {
          name: 'status',
          required: true,
          label: 'Status',
          align: 'left',
        },
        {
          name: 'action',
          label: 'Action',
          align: 'left',
        },
      ],
      subscriptionEdit: false,
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
      singleSubscription: {}
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
            }
      }
  },

  computed: {
   
  },

  methods:{
    
    getSubscriptionList(){
      let self = this;
      api
        .get('subscriptions')
        .then(function(response) {
          self.subscriptionList = response.data.data;
        })
        .catch(function(error) {
          console.log("subscription table get data error---",error);
        });
    },

    editSubscription(rowValue){
      this.singleSubscription = rowValue
      this.subscriptionName = rowValue.name
      this.subscriptionAmount = rowValue.amount
      this.subscriptionDuration = rowValue.duration
      this.subscriptionEdit = true
    },

    updateSubscription(){
      this.$v.subscriptionName.$touch()
      this.$v.subscriptionAmount.$touch()
      if (this.$v.subscriptionName.$error || this.$v.subscriptionAmount.$error) {
        this.$q.notify({
          position: "top",
          message: "Please review fields again."
        })
        return
      }
      
      let self = this
      let url = "subscriptions/" + this.singleSubscription.id
      let requestData = {
        name: this.subscriptionName,
        amount: this.subscriptionAmount,
        duration: this.subscriptionDuration,
        is_active: this.singleSubscription.is_active == '0'? false : true
      }
      
      api
        .put(url, requestData)
        .then(function (response) {
          self.$q.notify({
              position: "top",
              type: 'positive',
              timeout: 2000,
              message: response.data.message
          })
          self.getSubscriptionList()
          self.subscriptionEdit = false
          self.singleSubscription = {}
          self.subscriptionName = ''
          self.subscriptionAmount = ''
          self.subscriptionDuration = ''
          self.$v.subscriptionName.$reset()
          self.$v.subscriptionAmount.$reset()
        })
        .catch(function (error) {
          self.$q.notify({
              position: "top",
              timeout: 2000,
              message: 'Something went wrong !!'
          })
        });
    },

    changeSubscriptionStatus(rowValue, status){
      let dialogMsg = ''
      if(status == 'e'){
        dialogMsg = 'Do you want to enable this subscription ?'
      }
      if(status == 'd'){
        dialogMsg = 'Do you want to disable this subscription ?'
      }
      this.$q.dialog({
        title: 'Confirm',
        message: dialogMsg,
        ok: 'Agree',
        cancel: 'Disagree'
      }).then(() => {
        this.singleSubscription = rowValue
        let self = this
        let url = "subscriptions/" + this.singleSubscription.id
        let requestData = {
          name: this.singleSubscription.name,
          amount: this.singleSubscription.amount,
          duration: this.singleSubscription.duration,
          is_active: status == 'e'? true : false
        }
        
        api
          .put(url, requestData)
          .then(function (response) {
            let successMsg = ''
            if(status == 'e'){
              successMsg = 'Subscription enabled successfully'
            }
            if(status == 'd'){
              successMsg = 'Subscription disabled successfully'
            }
            self.$q.notify({
                position: "top",
                type: 'positive',
                timeout: 2000,
                message: successMsg
            })
            self.getSubscriptionList()
            self.singleSubscription = {}
          })
          .catch(function (error) {
            self.$q.notify({
                position: "top",
                timeout: 2000,
                message: 'Something went wrong !!'
            })
          });
      }).catch(() => {
        
      })
    },

  },

  filters:{

    showPrice: function(price){
      if(price){
        if(price.indexOf(".") > -1){
          let priceArray = price.split('.')
          return priceArray[0]
        }else{
          return price
        }
      }else{
        return price
      }
    }

  },

  created() {
    this.getSubscriptionList()
  }

}
</script>

<style>

</style>
