<template>
  <q-page padding>
    <div class="page-view">
       <div class="page-titles">
        <h3>Dashboard</h3>
      </div>
      <div class="state-overview">
        <div class="row gutter-sm">
          <div class="col-lg-4 col-md-6 col-sm-6">
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
          <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="info-box bg-purple">
              <span class="info-box-icon push-bottom">
                <q-icon name="list" color="white" size="40px"/>
              </span>
              <div class="info-box-content">
                <span class="info-box-text">Upcoming Expiration</span>
                <span class="info-box-number">{{upcomingExpireCount}}</span>
              </div>
            </div>
          </div>
           <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="info-box bg-green">
              <span class="info-box-icon push-bottom">
                <q-icon name="people" color="white" size="40px"/>
              </span>
              <div class="info-box-content">
                <span class="info-box-text">Staff</span>
                <span class="info-box-number">{{staffCount}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

       <!-- Satff list -->
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
                 {{props.row.Subscription_Ends}}
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

export default {
  name: 'PageName',
  components: {
  },
  data () {
    return {
      upcomingExpireCount: 0,
      upcomingExpireList: [],
      customerCount: 0,
      staffCount: 0,
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
      this.$router.push('/admin/customer/'+id)
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
          console.log("customer table get data error---",error);
        });
    },

  },

  computed: {

  }

}
</script>

<style>

</style>
