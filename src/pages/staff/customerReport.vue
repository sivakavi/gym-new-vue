<template>
  <q-page padding>
    <div class="page-view">
       <div class="page-titles">
        <h3>Customer Report</h3>
      </div>
      <div class="row">
        <div class="col-md-3 padding-center">
          <div class="padding-bottom-5">Start Date</div>
          <q-datetime class="form-input" :max="maxDay" format="DD-MM-YYYY" v-model="dos"/>
          <span class="form-group__error" v-if="$v.dos.$error && !$v.dos.required">Field is required.</span>
        </div>
        <div class="col-md-3 padding-center">
          <div class="padding-bottom-5">End Date</div>
          <q-datetime class="form-input" :max="maxDay" format="DD-MM-YYYY" v-model="doe"/>
          <span class="form-group__error" v-if="$v.doe.$error && !$v.doe.required">Field is required.</span>
        </div>
        <div class="col-md-3 btn-padding">
          <q-btn color="purple" @click="getCustomerReport" label="Get Report" />
        </div>
      </div>
      <br/>
      <q-card>
        <q-card-title class="card-header">
          Customer Report
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <q-table :data="customerList" :pagination.sync="pagination" :columns="customerColumns" row-key="name" class="table-view">
            <q-tr slot="body" slot-scope="props" :props="props">
              <q-td key="action" :props="props" >
                <q-btn round color="secondary" icon="visibility" @click="viewCustomer(props.row.id)"/>
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

import { 
    required, 
    email,
    minLength,
    maxLength,
    numeric,
    alpha
} from 'vuelidate/lib/validators'

export default {

  name: 'CustomerReport',
  
  components: {
  
  },
  
  data () {
    return {
      customerList: [],
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
      },
      dos: '',
      doe: '',
      maxDay: '',
      userID: ''
    }
  },

  validations(){
      return {
            dos:{
              required
            },
            doe:{
              required
            }
          }
  },

  computed: {
    
  },

  methods:{

    viewCustomer(id){
      this.$router.push('/staff/customer/'+id)
    },

    getCustomerReport(){
      let self = this;
      this.$v.dos.$touch()
      this.$v.doe.$touch()
      if (this.$v.dos.$error || this.$v.doe.$error) {
        this.$q.notify({
          position: "top",
          message: "Please review fields again."
        })
        return
      }
      let startCheck = moment(moment(this.dos).format("YYYY-MM-DD HH:mm:ss"), "YYYY-MM-DD HH:mm:ss")
      let endCheck = moment(moment(this.doe).format("YYYY-MM-DD HH:mm:ss"), "YYYY-MM-DD HH:mm:ss")
      if(endCheck.isSameOrAfter(startCheck)){
        if (this.userID == '' || !this.userID) {
          this.$q.notify({
            position: "top",
            message: "User ID not found."
          })
          return
        }
        let startDate = moment(this.dos).format('YYYY-MM-DD')
        let endDate = moment(this.doe).format('YYYY-MM-DD')
        let url = 'getCustomerReport?user_id='+this.userID+'&dos='+startDate+'&doe='+endDate
        api
          .get(url)
          .then(function(response) {
            self.customerList = response.data.data;
          })
          .catch(function(error) {
            console.log("customer table get data error---",error);
          });
      }else{
        this.$q.notify({
          position: "top",
          message: "End date is must greater than Start date."
        })
      }
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
    let today = moment().format('YYYY-MM-DD');
    this.maxDay = today;
    //this.dos = this.maxDay
    //this.doe = this.maxDay
    let userDetail = JSON.parse(localStorage.userDetail)
    this.userID = userDetail.id
  }

}
</script>

<style>

.q-table-top{
  padding-bottom: 30px;
}

.padding-bottom-5{
  padding-bottom: 5px
}

.btn-padding{
  padding: 28px 10px 0px 10px;
}

.padding-center{
  padding: 0 10px;
}

.select-input{
    width: 100%;
    height: 45px;
    padding: 7px 12px;
    font-size: 14px;
    color: #555;
    border: 1px solid #ccc;
    border-bottom: none;
}

.black-color{
  color: #000 !important;
}

</style>
