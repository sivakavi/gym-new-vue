<template>
  <q-page padding>
    <div class="page-view">
      <!-- Page-title -->
      <div class="page-titles">
        <h3>Customer detail <q-btn round color="black" @click="goBack" style="float:right;" icon="keyboard_backspace" /></h3>
      </div>

      <!-- View Appointments-->
      <div class="row gutter-md">
        <div class="col-sm-12 col-lg-4">
          <!-- Personal-details -->
          <div class="profile-sidebar">
            <q-card>
              <q-card-title class="card-header">
                Personal Details
              </q-card-title>
              <q-card-separator />
              <q-card-main>
                <div v-if="customer.gender=='male'" class="profile-userpic">
                  <img :src="malePicture" class="img-responsive" alt="">
                </div>
                <div v-if="customer.gender=='female'" class="profile-userpic">
                  <img :src="femalePicture" class="img-responsive" alt="">
                </div>
                <div v-if="customer.gender=='other'" class="profile-userpic">
                  <img :src="otherPicture" class="img-responsive" alt="">
                </div>
                <div class="profile-usertitle">
                  <div class="profile-usertitle-name"> {{customer.fname}} {{customer.lname}} </div>
                </div>
                <ul class="list-group list-group-unbordered">
                  <li class="list-group-item">
                    <b>IDs</b>
                    <span>{{customer.regno}}</span>
                  </li>
                  <li class="list-group-item">
                    <b>Data of joining</b>
                    <span>{{customer.doj | momentDate}}</span>
                  </li>
                  <li class="list-group-item">
                    <b>Email Id</b>
                    <span>{{customer.email}}</span>
                  </li>
                  <li class="list-group-item">
                    <b>Phone Number</b>
                    <span>+91 {{customer.mobileno}}</span>
                  </li>
                  <li class="list-group-item">
                    <b>Gender</b>
                    <span>{{customer.gender}}</span>
                  </li>
                  <li class="list-group-item">
                    <b>Data of birth</b>
                    <span>{{customer.dob | momentDate}}</span>
                  </li>
                </ul>
              </q-card-main>
            </q-card>
          </div>
        </div>
        <div class="col-sm-12 col-lg-8">
          <!-- today consultancy  -->
          <div class="test-view">
             <q-card>
              <q-card-title class="card-header">
                Subscriptions  <q-btn color="purple" style="float:right;" @click="addSubscription" label="Add Subscription" />
              </q-card-title>
              <q-card-separator />
              <q-card-main class="about">
                <table v-if="customer.customerSubscription.length == 0" class="local-table-view">
                  <tr>
                    <th>Action</th>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Balance</th>
                    <th>Duration (Months)</th>
                    <th>Start</th>
                    <th>End</th>
                  </tr>
                  <tbody>
                  <tr>
                    <td colspan="7" align="center"> No Data Found</td>
                  </tr>
                  </tbody>
                </table>
                <q-table v-if="customer.customerSubscription.length != 0" :data="customer.customerSubscription" hide-bottom :columns="subscriptoincolumns" row-key="name" class="table-view">
                  <q-tr slot="body" slot-scope="props" :props="props">
                    <q-td key="action" :props="props" >
                      <q-btn @click="viewSubscription(props.row)" round color="secondary" icon="visibility"/>
                    </q-td>
                    <q-td key="name" :props="props" >
                      {{props.row.name}}
                    </q-td>
                    <q-td key="amount" :props="props" >
                      {{props.row.amount | showPrice}}
                    </q-td>
                    <q-td key="balance" :props="props" >
                      {{props.row.balance | showPrice}}
                    </q-td>
                    <q-td key="duration" :props="props" >
                      {{props.row.months}}
                    </q-td>
                    <q-td key="start" :props="props" >
                      {{props.row.doj | momentDate}}
                    </q-td>
                    <q-td key="end" :props="props" >
                      {{props.row.doe | momentDate}}
                    </q-td>
                  </q-tr>
                </q-table>
              </q-card-main>
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <q-modal no-esc-dismiss no-backdrop-dismiss class="smart-model-view" v-model="subscriptionView" :content-css="{ minWidth: '50vw'}">
      <q-card>
        <q-card-title class="model-header">
          <div class="model-title">Subscription View</div>
          <q-btn @click="subscriptionView = false" flat icon="clear" class="header-btn" color="white" slot="right"></q-btn>
        </q-card-title>
      <q-card-main class="model-main">
          <div class="form-body">
            <div class="form-group">
                <div class="row gutter-sm">
                  <div class="col-md-3">
                    <label>Name : </label>
                  </div>
                <div class="col-md-5">
                  <span>{{singleSubscription.name}}</span>
                </div>
              </div>
            </div>

            <div class="form-group">
                <div class="row gutter-sm">
                  <div class="col-md-3">
                    <label>Amount : </label>
                  </div>
                <div class="col-md-5">
                  <span>{{singleSubscription.amount | showPrice}}</span>
                </div>
              </div>
            </div>

            <div class="form-group">
                <div class="row gutter-sm">
                  <div class="col-md-3">
                    <label>Balance : </label>
                  </div>
                <div class="col-md-5">
                  <span>{{singleSubscription.balance | showPrice}}</span>
                </div>
              </div>
            </div>
             
            <div class="form-group">
                <div class="row gutter-sm">
                  <div class="col-md-3">
                    <label>Durations (Months) : </label>
                  </div>
                <div class="col-md-5">
                  <span>{{singleSubscription.months}}</span>
                </div>
              </div>
            </div>

            <div class="form-group">
                <div class="row gutter-sm">
                  <div class="col-md-3">
                    <label>Start Date : </label>
                  </div>
                <div class="col-md-5">
                  <span>{{singleSubscription.doj | momentDate}}</span>
                </div>
              </div>
            </div>

            <div class="form-group">
                <div class="row gutter-sm">
                  <div class="col-md-3">
                    <label>End Date : </label>
                  </div>
                <div class="col-md-5">
                  <span>{{singleSubscription.doe | momentDate}}</span>
                </div>
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

    <q-modal no-esc-dismiss no-backdrop-dismiss class="smart-model-view" v-model="subscriptionAdd" :content-css="{ minWidth: '50vw'}">
      <q-card>
        <q-card-title class="model-header">
          <div class="model-title">Customer - Subscription Add</div>
          <q-btn @click="subscriptionAdd = false" flat icon="clear" class="header-btn" color="white" slot="right"></q-btn>
        </q-card-title>
        <q-card-main class="model-main">
            <div class="form-body">
              <div class="form-group">
                <div class="row gutter-sm">
                  <div class="col-md-4">
                    <label class="control-label">Subscription</label>
                  </div>
                <div class="col-md-6">
                  <q-select class="form-input" @input="selectedSubscriptionOption" v-model="selectedSubscription" :options="subscriptionOptions"/>
                  <span class="form-group__error" v-if="$v.selectedSubscription.$error && !$v.selectedSubscription.required">Field is required.</span>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row gutter-sm">
                <div class="col-md-4">
                  <label class="control-label">Amount</label>
                </div>
                <div class="col-md-6">
                  <q-input class="form-input" v-model="subscriptionAmount"/>
                  <span class="form-group__error" v-if="$v.subscriptionAmount.$error && !$v.subscriptionAmount.required">Field is required.</span>
                  <span class="form-group__error" v-if="$v.subscriptionAmount.$error && !$v.subscriptionAmount.numericWithDot">Accept numeric value only.</span>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row gutter-sm">
                <div class="col-md-4">
                  <label class="control-label">Duration (Months)</label>
                </div>
                <div class="col-md-6">
                  <q-input readonly class="form-input" v-model="subscriptionDuration"/>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row gutter-sm">
                <div class="col-md-4">
                  <label class="control-label">Subscriptoin Start Date</label>
                </div>
                <div class="col-md-6">
                  <q-datetime @change="startDateChange" class="form-input" format="DD-MM-YYYY" inverted color="light-blue" :first-day-of-week="1" v-model="subscriptionStart"/>
                  <span class="form-group__error" v-if="$v.subscriptionStart.$error && !$v.subscriptionStart.required">Field is required.</span>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row gutter-sm">
                <div class="col-md-4">
                  <label class="control-label">Subscriptoin Start End</label>
                </div>
                <div class="col-md-6">
                  <q-input readonly class="form-input" v-model="subscriptionEnd"/>
                </div>
              </div>
            </div>

          </div>
        
        </q-card-main>
       <q-card-actions class="model-footer border-1px">
          <div style="width: 100%">
              <q-btn @click="assignSubscription" class="add-btn float-right">Assign Subscription</q-btn>
          </div>
        </q-card-actions>
      </q-card>
    </q-modal>

  </q-page>
</template>

<script>

import api from 'src/services/api/api'
import moment from 'moment';
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
  name: 'CustomerProfile',
  components: {
  },
  data () {
    return {
      malePicture: './statics/male-avatar.png',
      otherPicture: './statics/other-avatar.png',
      femalePicture: './statics/female-avatar.png',
      customerID: '',
      customer:{
        "id": '',
        "regno": "",
        "fname": "",
        "lname": "",
        "gender": "",
        "dob": "",
        "mobileno": "",
        "email": "",
        "photo": '',
        "created_at": "",
        "updated_at": "",
        "doj": "",
        "user_id": "",
        "customerSubscription": [],
        "payment": []
      },
      subscriptoincolumns: [
        {
          name: 'action',
          required: true,
          label: 'Action',
          align: 'left',
        },
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
          name: 'balance',
          required: true,
          label: 'Balance',
          align: 'left',
        },
        {
          name: 'duration',
          required: true,
          label: 'Duration (Months)',
          align: 'left',
        },
        {
          name: 'start',
          required: true,
          label: 'Start',
          align: 'left',
        },
        {
          name: 'end',
          required: true,
          label: 'End',
          align: 'left',
        },
      ],
       pagination: {
        sortBy: null,
        descending: true,
        page: 1,
        rowsPerPage: 10
      },
      subscriptionView: false,
      singleSubscription: {},
      subscriptionAdd: false,
      selectedSubscription: '',
      subscriptionList: [],
      subscriptionOptions: [],
      subscriptionAmount: '',
      subscriptionDuration: '',
      subscriptionStart: '',
      subscriptionEnd: ''
    }
  },

  computed: {
    
  },

  validations(){
      return {
            selectedSubscription:{
              required
            },
            subscriptionAmount:{
              required
            },
            subscriptionStart:{
              required
            },
      }
  },

  methods: {

    goBack(){
      this.$router.push('/admin/customer-list')
    },

    addSubscription(){
      this.selectedSubscription = ''
      this.subscriptionAmount = ''
      this.subscriptionDuration = ''
      this.subscriptionStart = ''
      this.subscriptionEnd = ''
      this.$v.selectedSubscription.$reset()
      this.$v.subscriptionAmount.$reset()
      this.$v.subscriptionStart.$reset()
      this.subscriptionAdd = true
    },

    getCustomer(){
      let self = this;
      api
        .get('customers/'+this.customerID)
        .then(function(response) {
          self.customer = response.data.data;
          //console.log(response.data.data)
        })
        .catch(function(error) {
          console.log("customer get data error---",error);
        });
    },

    viewSubscription(subscription){
      this.singleSubscription = subscription
      this.subscriptionView = true
    },

    getSubscriptionList(){
      let self = this;
      api
        .get('subscriptions')
        .then(function(response) {
          self.subscriptionList = response.data.data;
          let filterArray = self.subscriptionList.filter(function(item){
            return item.is_active == '1';
          })
          filterArray.forEach(function(element) {
            let singleItem = {
              label: element.name + ' - ( ' + element.duration + ' ) - ( ' + element.amount + ' )',
              value: element
            }
            self.subscriptionOptions.push(singleItem)
          });
        })
        .catch(function(error) {
          console.log("subscription table get data error---",error);
        });
    },

    selectedSubscriptionOption(){
      this.subscriptionAmount = this.selectedSubscription.amount
      this.subscriptionDuration = this.selectedSubscription.duration
    },

    startDateChange(){
      if(this.subscriptionDuration){
        let addMonths = parseInt(this.subscriptionDuration)
        let endDate = moment(this.subscriptionStart).add(addMonths, 'M')
        let endDateFormat = moment(endDate).format('DD-MM-YYYY')
        this.subscriptionEnd = endDateFormat
      }else{
        this.subscriptionStart = ''
        this.$q.notify({
            position: "top",
            timeout: 2000,
            message: 'Please select Subscription..'
        })
      }
    },

    assignSubscription(){
      this.$v.selectedSubscription.$touch()
      this.$v.subscriptionAmount.$touch()
      this.$v.subscriptionStart.$touch()
      if (this.$v.selectedSubscription.$error || this.$v.subscriptionAmount.$error || this.$v.subscriptionStart.$error) {
        this.$q.notify({
          position: "top",
          message: "Please review fields again."
        })
        return
      }
      
      let self = this
      let url = "customersubscriptions"
      let requestData = {
        subscription_id: ""+this.selectedSubscription.id,
        customer_id: this.customerID,
        amount: this.subscriptionAmount,
        doj: moment(this.subscriptionStart).format('YYYY-MM-DD')
      }

      //console.log(requestData)

      this.$q.dialog({
        title: 'Confirm',
        message: 'Do you want to add subscription to this customer ?',
        ok: 'Agree',
        cancel: 'Disagree'
      }).then(() => {
        api
        .post(url, requestData)
        .then(function (response) {
          self.$q.notify({
              position: "top",
              type: 'positive',
              timeout: 2000,
              message: response.data.message
          })
          self.getCustomer()
          self.subscriptionAdd = false
        })
        .catch(function (error) {
          if(!error.response.data.success){
            self.$q.notify({
              position: "top",
              timeout: 2000,
              message: error.response.data.message
            })
          }
        });
      }).catch(() => {
        
      })
    },
    
  },

  filters:{

    momentDate: function (date) {
      if(date)
        return moment(date).format('DD-MM-YYYY');
      else
        return date
    },

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

  created(){
    this.customerID = this.$route.params.id;
    this.getCustomer()
    this.getSubscriptionList()
  }
  
}
</script>

<style>

</style>
