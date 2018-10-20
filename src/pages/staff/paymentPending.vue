<template>
  <q-page padding>
    <div class="page-view">
       
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

    </div>

  </q-page>
</template>

<script>

import api from 'src/services/api/api'
import moment from 'moment';

export default {

  name: 'PaymentPendingCustomer',
  
  components: {
    
  },
  
  data () {
    return {
      paymentPendingCount: 0,
      paymentPendingList: [],
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
   
  },

  computed: {

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

  created(){
    this.getPaymentPendingCustomerList()
  }

}
</script>

<style>

.hand-symbol{
  cursor: pointer;
}

</style>
