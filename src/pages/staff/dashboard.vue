<template>
  <q-page padding>
    <div class="page-view">
       <div class="page-titles">
        <h3>Dashboard</h3>
      </div>
      <div class="state-overview">
        <div class="row gutter-sm">
          <div @click="gotoCustomer" class="col-lg-4 col-md-6 col-sm-6 hand-symbol">
            <div class="info-box bg-blue">
              <span class="info-box-icon push-bottom">
                <q-icon name="wc" color="white" size="40px"/>
              </span>
              <div class="info-box-content">
                <span class="info-box-text">Customer</span>
                <span class="info-box-number">{{customerCount}}</span>
              </div>
            </div>
          </div>
          <div @click="gotoUpcomingExpiration" class="col-lg-4 col-md-6 col-sm-6 hand-symbol">
            <div class="info-box bg-purple">
              <span class="info-box-icon push-bottom">
                <q-icon name="announcement" color="white" size="40px"/>
              </span>
              <div class="info-box-content">
                <span class="info-box-text">Upcoming Expiration</span>
                <span class="info-box-number">{{upcomingExpireCount}}</span>
              </div>
            </div>
          </div>
           <div @click="gotoPaymentPending" class="col-lg-4 col-md-6 col-sm-6 hand-symbol">
            <div class="info-box bg-green">
              <span class="info-box-icon push-bottom">
                <q-icon name="money_off" color="white" size="40px"/>
              </span>
              <div class="info-box-content">
                <span class="info-box-text">Payment Pending</span>
                <span class="info-box-number">{{paymentPendingCount}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <q-card>
        <q-card-title class="card-header">
          Payment Pending Customer
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <q-table :data="paymentPendingList" :pagination.sync="pagination" :columns="paymentPendingColumns" row-key="name" class="table-view">
             <q-tr slot="body" slot-scope="props" :props="props">
              <q-td key="action" :props="props" >
                 <q-btn @click="viewCustomer(props.row.customer_id)" round color="secondary" icon="visibility"/>
              </q-td>
              <q-td key="regNo" :props="props" >
                 {{props.row.customer.regno}}
              </q-td>
              <q-td key="name" :props="props" >
                 {{props.row.customer.fname}} {{props.row.customer.lname}}
              </q-td>
              <q-td key="amount" :props="props" >
                 {{props.row.amount | showPrice}}
              </q-td>
              <q-td key="balance" :props="props" >
                 {{props.row.balance | showPrice}}
              </q-td>
              <q-td key="phone" :props="props" >
                 {{props.row.customer.mobileno}}
              </q-td>
             </q-tr>
          </q-table>
        </q-card-main>
      </q-card>

      <q-card>
        <q-card-title class="card-header">
          Upcoming Customer Expiration
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <q-table :data="upcomingExpireList" :pagination.sync="pagination" :columns="upcomingExpireColumns" row-key="name" class="table-view">
             <q-tr slot="body" slot-scope="props" :props="props">
              <q-td key="action" :props="props" >
                 <q-btn @click="viewCustomer(props.row.customer_id)" round color="secondary" icon="visibility"/>
              </q-td>
              <q-td key="regNo" :props="props" >
                 {{props.row.regno}}
              </q-td>
              <q-td key="name" :props="props" >
                 {{props.row.name}}
              </q-td>
              <q-td key="endDate" :props="props" >
                 {{props.row.doe | momentDate}}
              </q-td>
              <q-td key="phone" :props="props" >
                 {{props.row.mobileno}}
              </q-td>
               <q-td key="emailId" :props="props" >
                 {{props.row.email}}
              </q-td>
             </q-tr>
          </q-table>
        </q-card-main>
      </q-card>

      <q-card>
        <q-card-title class="card-header">
          Birthday Reminder
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <q-table :data="birthdayReminderList" :pagination.sync="pagination" :columns="birthdayReminderColumns" row-key="name" class="table-view">
             <q-tr slot="body" slot-scope="props" :props="props">
              <q-td key="action" :props="props" >
                 <q-btn @click="viewCustomer(props.row.id)" round color="secondary" icon="visibility"/>
              </q-td>
              <q-td key="regNo" :props="props" >
                 {{props.row.regno}}
              </q-td>
              <q-td key="name" :props="props" >
                 {{props.row.fname}} {{props.row.lname}}
              </q-td>
              <q-td key="dob" :props="props" >
                 {{props.row.dob | momentDate}}
              </q-td>
              <q-td key="phone" :props="props" >
                 {{props.row.mobileno}}
              </q-td>
               <q-td key="emailId" :props="props" >
                 {{props.row.email}}
              </q-td>
             </q-tr>
          </q-table>
        </q-card-main>
      </q-card>

      <!-- <q-card>
        <q-card-title class="card-header">
          Chart
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <div>
          <customer-chart/>
          </div>
        </q-card-main>
      </q-card> -->

    </div>

  </q-page>
</template>

<script>

import api from 'src/services/api/api'
import moment from 'moment';

//import CustomerChart from 'src/components/charts/bar.vue'

export default {

  name: 'AdminDashboard',
  
  components: {
    //CustomerChart
  },
  
  data () {
    return {
      upcomingExpireCount: 0,
      paymentPendingCount: 0,
      upcomingExpireList: [],
      paymentPendingList: [],
      birthdayReminderList: [],
      customerCount: 0,
      birthdayReminderColumns: [
        {
          name: 'action',
          label: 'Action',
          align: 'left',
        },
        {
          name: 'regNo',
          required: true,
          label: 'Reg. No',
          align: 'left',
        },
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
        },
        {
          name: 'dob',
          required: true,
          label: 'DOB',
          align: 'left',
        },
        {
          name: 'phone',
          required: true,
          label: 'Mobile',
          align: 'left',
        },
        {
          name: 'emailId',
          required: true,
          label: 'Email id',
          align: 'left',
        },
      ],
      upcomingExpireColumns: [
        {
          name: 'action',
          label: 'Action',
          align: 'left',
        },
        {
          name: 'regNo',
          required: true,
          label: 'Reg. No',
          align: 'left',
        },
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
        },
        {
          name: 'endDate',
          required: true,
          label: 'Expire Date',
          align: 'left',
        },
        {
          name: 'phone',
          required: true,
          label: 'Mobile',
          align: 'left',
        },
        {
          name: 'emailId',
          required: true,
          label: 'Email id',
          align: 'left',
        },
      ],
      paymentPendingColumns: [
        {
          name: 'action',
          label: 'Action',
          align: 'left',
        },
        {
          name: 'regNo',
          required: true,
          label: 'Reg. No',
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
          name: 'phone',
          required: true,
          label: 'Mobile',
          align: 'left',
        },
      ],
       pagination: {
        sortBy: null,
        descending: true,
        page: 1,
        rowsPerPage: 5
      }
    }
  },

  methods:{

    viewCustomer(id){
      this.$router.push('/staff/customer/'+id)
    },

    gotoCustomer(){
      this.$router.push('/staff/customer-list')
    },

     gotoUpcomingExpiration(){
      this.$router.push('/staff/upcoming-expiration')
    },

    gotoPaymentPending(){
      this.$router.push('/staff/payment-pending')
    },

    getCustomerList(){
      let self = this;
      api
        .get('customers')
        .then(function(response) {
          let customerList = response.data.data;
          self.customerCount = customerList.length
        })
        .catch(function(error) {
          console.log("customer table get data error---",error);
        });
    },

    getExpiringCustomerList(){
      let self = this;
      api
        .get('getSubscriptionExpire')
        .then(function(response) {
          self.upcomingExpireList = response.data.data;
          self.upcomingExpireCount = self.upcomingExpireList.length
        })
        .catch(function(error) {
          console.log("customer expiring table get data error---",error);
        });
    },

    getPaymentPendingCustomerList(){
      let self = this;
      api
        .get('getPaymentPending')
        .then(function(response) {
          self.paymentPendingList = response.data.data;
          self.paymentPendingCount = self.paymentPendingList.length
        })
        .catch(function(error) {
          console.log("customer payment pending table get data error---",error);
        });
    },

    getBirthdayReminderList(){
      let self = this;
      api
        .get('getBirthDayRemainder')
        .then(function(response) {
          self.birthdayReminderList = response.data.data;
        })
        .catch(function(error) {
          console.log("customer dob table get data error---",error);
        });
    },

  },

  computed: {

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
    this.getCustomerList()
    this.getExpiringCustomerList()
    this.getPaymentPendingCustomerList()
    this.getBirthdayReminderList()
  }

}
</script>

<style>

.hand-symbol{
  cursor: pointer;
}

</style>
