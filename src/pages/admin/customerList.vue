<template>
  <q-page padding>
    <div class="page-view">
       <div class="page-titles">
        <h3>Customer</h3>
      </div>
      <router-link class="add-btn" to="/admin/create-customer">Add Customer</router-link>
      <q-card>
        <q-card-title class="card-header">
          Customer List
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <q-table :filter="filter" :data="customerList" :pagination.sync="pagination" :columns="customerColumns" row-key="name" class="table-view">
                  <template slot="top-right" slot-scope="props">
                    <q-search
                      color="dark"
                      v-model="filter"
                    />
                  </template>
                  <q-tr slot="body" slot-scope="props" :props="props">
                    <q-td key="action" :props="props" >
                      <q-btn round color="secondary" icon="visibility" @click="viewCustomer(props.row.id)"/>
                      &nbsp;&nbsp;
                      <q-btn round color="amber" text-color="black" icon="edit" @click="editCustomer(props.row.id)" />
                    </q-td>
                    <q-td key="customer_id" :props="props" >
                      {{props.row.regno}}
                    </q-td>
                    <q-td key="name" :props="props" >
                      {{props.row.fname}} {{props.row.lname}}
                    </q-td>
                    <q-td key="gender" :props="props" >
                      {{props.row.gender}}
                    </q-td>
                    <q-td key="doj" :props="props" >
                      {{props.row.doj | momentDate}}
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

  name: 'CustomerList',
  
  components: {
  
  },
  
  data () {
    return {
      customerList: [],
      filter: '',
      customerColumns: [
        {
          name: 'action',
          label: 'Action',
          align: 'left',
          sortable: false
        },
        {
          name: 'customer_id',
          label: 'ID',
          align: 'left',
          field: 'regno',
          sortable: true
        },
        {
          name: 'name',
          label: 'Name',
          align: 'left',
          field: 'fname',
          sortable: true
        },
        {
          name: 'gender',
          label: 'Gender',
          align: 'left',
          sortable: false
        },
        {
          name: 'doj',
          label: 'DOJ',
          align: 'left',
          sortable: false
        },
        {
          name: 'phone',
          label: 'Mobile',
          align: 'left',
          sortable: true
        },
        {
          name: 'emailId',
          label: 'Email Id',
          align: 'left',
          sortable: true
        },
      ],
       pagination: {
        sortBy: null, // String, column "name" property value
        descending: true,
        page: 1,
        rowsPerPage: 10 // current rows per page being displayed
      }
    }
  },

  computed: {
    
  },

  methods:{

    viewCustomer(id){
      this.$router.push('/admin/customer/'+id)
    },

    editCustomer(id){
      this.$router.push('/admin/edit-customer/'+id)
    },

    getCustomerList(){
      let self = this;
      api
        .get('customers')
        .then(function(response) {
          self.customerList = response.data.data;
        })
        .catch(function(error) {
          console.log("customer table get data error---",error);
        });
    },

  },

  filters:{

    momentDate: function (date) {
      if(date)
        return moment(date).format('DD-MM-YYYY');
      else
        return date
    },

  },

  created() {
    this.getCustomerList()
  }

}
</script>

<style>

.q-table-top{
  padding-bottom: 30px;
}

</style>
