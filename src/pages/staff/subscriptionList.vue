<template>
  <q-page padding>
    <div class="page-view">
       <div class="page-titles">
        <h3>Subscription</h3>
      </div>
      <q-card>
        <q-card-title class="card-header">
          Subscription List
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <q-table :data="subscriptionList" :columns="subscriptionColumns" hide-bottom :pagination="pagination" row-key="name" class="table-view">
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
             </q-tr>
          </q-table>
        </q-card-main>
      </q-card>
    </div>
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
        }
      ],
      pagination: {
        page: 1,
        rowsPerPage: ''
      },
    }
  },

  validations(){
     
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
