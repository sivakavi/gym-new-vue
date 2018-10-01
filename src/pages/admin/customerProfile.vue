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

  </q-page>
</template>

<script>

import api from 'src/services/api/api'
import moment from 'moment';

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
      singleSubscription: {}
    }
  },

  computed: {
    
  },

  methods: {

    goBack(){
      this.$router.push('/admin/customer-list')
    },

    addSubscription(){
      this.$router.push('/admin/addgsttype')
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
    }
    
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
  }
  
}
</script>

<style>

</style>
