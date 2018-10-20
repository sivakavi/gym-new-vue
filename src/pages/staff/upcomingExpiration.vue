<template>
  <q-page padding>
    <div class="page-view">
      
      <q-card>
        <q-card-title class="card-header">
          Upcoming Expiration Customer List
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

    </div>

  </q-page>
</template>

<script>

import api from 'src/services/api/api'
import moment from 'moment';

export default {

  name: 'UpcomingExpiratonCustomer',
  
  components: {

  },
  
  data () {
    return {
      upcomingExpireList: [],
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

  },

  created(){
    this.getExpiringCustomerList()
  }

}
</script>

<style>

</style>
